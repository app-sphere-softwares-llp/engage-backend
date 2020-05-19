import { ClientSession, Document, DocumentQuery, FilterQuery, Model, UpdateQuery } from 'mongoose';
import { DEFAULT_QUERY_FILTER, MAX_TRANSACTION_RETRY_TIMEOUT } from '@/shared/constants';
import { QueryModel } from '@/shared/models';

export class BaseService<T extends Document> {
  constructor(private model: Model<T>) {
  }

  /**
   * get native db model
   */
  get dbModel() {
    return this.model;
  }

  /**
   * find doc by using conditions
   * @param model
   */
  public async find(model: QueryModel): Promise<T[]> {
    const query = this.model.find({...model.filter, ...DEFAULT_QUERY_FILTER});
    this.queryBuilder(model, query);

    return query.exec();
  }

  /**
   * find single doc by id
   * @param id
   * @param model
   */
  public async findById(id: string, model: QueryModel): Promise<T> {
    model.filter = {_id: id};
    const query = this.model.findOne({...model.filter, ...DEFAULT_QUERY_FILTER});
    this.queryBuilder(model, query);

    return query.exec();
  }

  /**
   * find one doc using conditions
   * @param model
   */
  public async findOne(model: QueryModel): Promise<T> {
    const query = this.model.findOne({ ...model.filter, ...DEFAULT_QUERY_FILTER });
    this.queryBuilder(model, query);

    return query.exec();
  }

  /**
   * create a doc in collection
   * @param doc
   * @param session
   */
  public async create(doc: any | any[], session: ClientSession): Promise<T | T[]> {
    return await this.model.create(doc, { session });
  }

  /**
   * update doc by id in collection
   * @param id
   * @param updatedDoc
   * @param session
   */
  public async updateById(id: string, updatedDoc: UpdateQuery<T>, session: ClientSession): Promise<T> {
    return await this.model
      .updateOne({ _id: id } as any, updatedDoc, { session }).exec();
  }

  /**
   * update doc in collection
   * @param condition
   * @param updatedDoc
   * @param session
   */
  public async update(condition: FilterQuery<T>, updatedDoc: UpdateQuery<T>, session: ClientSession): Promise<T> {
    return await this.model
      .updateOne(condition, updatedDoc, { session }).exec();
  }

  /**
   * update's multiple docs in collection
   * @param filter
   * @param updatedDoc
   * @param session
   */
  public async bulkUpdate(filter: any, updatedDoc: any, session: ClientSession) {
    return this.model
      .update(filter, updatedDoc, { session, multi: true });
  }

  /**
   * delete docs ( actually soft delete mark isDeleted: true )
   * @param id
   * @param session
   */
  public async delete(id: string, session: ClientSession): Promise<T> {
    return this.model
      .updateOne({ _id: id } as any, { isDeleted: true } as any, session)
      .exec();
  }

  /**
   * retry failed session implementation
   * accepts a function which get's called inside a while loop
   * if an error occurs regarding transaction error then it will try to rerun the session
   * and if there any errors which are not type of transaction error then it will throw and log error
   * @param txnFn
   */
  async withRetrySession(txnFn: Function) {
    const startTime = Date.now();
    while (true) {
      // create a session
      const session = await this.startSession();
      try {
        // execute requested function
        const result = await txnFn(session);

        // if all seems good commit transaction
        await BaseService.commitTransaction(session);

        // return result
        return result;
      } catch (e) {
        // if error type is TransientTransactionError then try to re commit the session
        const isTransientError = e.errorLabels && e.errorLabels.includes('TransientTransactionError') && BaseService.hasNotTimedOut(startTime, MAX_TRANSACTION_RETRY_TIMEOUT);
        const isCommitError = e.errorLabels && e.errorLabels.includes('UnknownTransactionCommitResult') && BaseService.hasNotTimedOut(startTime, MAX_TRANSACTION_RETRY_TIMEOUT);

        if (!isTransientError || !isCommitError) {
          // if not transaction error then throw it away
          await BaseService.handleError(session, e);
        }
      }
    }
  }

  /**
   * create a session object and return it
   */
  private async startSession(): Promise<ClientSession> {
    const session = await this.model.db.startSession();
    session.startTransaction();
    return session;
  }

  /**
   * commit session and end that session
   * @param session
   * @returns {Promise<void>}
   */
  private static async commitTransaction(session: ClientSession) {
    await session.commitTransaction();
    session.endSession();
  }

  /**
   * abort a session and end that session
   * @param session
   * @returns {Promise<void>}
   */
  private static async abortTransaction(session: ClientSession) {
    await session.abortTransaction();
    session.endSession();
  }

  /**
   * check whether max transaction timed out or not
   * @param startTime
   * @param max
   */
  private static hasNotTimedOut(startTime, max) {
    return Date.now() - startTime < max;
  }

  /**
   * handle error for every db request
   * @param session
   * @param err
   */
  private static async handleError(session, err) {
    await BaseService.abortTransaction(session);
    throw err;
  }

  /**
   * query builder
   * builds a query object from given filter
   * @param model
   * @param query
   */
  private queryBuilder(model: QueryModel, query: DocumentQuery<T | T[], any>) {
    if (model.populate && model.populate.length) {
      query.populate(model.populate);
    }

    if (model.select) {
      query.select(model.select);
    }

    if (model.lean) {
      query.lean();
    }

    if (model.sort) {
      query.sort({ [model.sort]: model.sortBy || 'asc' });
    }
  }
}
