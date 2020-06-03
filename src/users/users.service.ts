import { User } from './users.schema';
import { ClientSession, Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@/shared/services';
import { UserStatus } from '@/shared/enums';
import { QueryModel } from '@/shared/models';

export class UsersService extends BaseService<User> {
  constructor(@InjectModel(User.name) protected readonly userModel: Model<User>) {
    super(userModel);
  }


  /**
   * get user by email id
   * @param {string} emailId
   * @return {Promise<User>}
   */
  async getUserByEmailId(emailId: string): Promise<User> {
    const params: QueryModel = {
      filter: { emailId, status: UserStatus.Active },
      lean: true,
    };
    return await this.findOne(params);
  }


  /**
   * get user by mobile no
   * @param {string} mobileNo
   * @return {Promise<User>}
   */
  async getUserByMobileNo(mobileNo: string): Promise<User> {
    const params: QueryModel = {
      filter: { mobileNo, status: UserStatus.Active },
      lean: true,
    };
    return await this.findOne(params);
  }


  /**
   * create user
   * @param {Partial<User>} user
   * @param {ClientSession} session
   * @return {Promise<User>}
   */
  async createUser(user: Partial<User>, session: ClientSession): Promise<User> {
    return await this.create(user, session) as User;
  }


  /**
   * update user
   * update user by id
   * @param {string} id
   * @param {Partial<User>} user
   * @param {ClientSession} session
   * @return {Promise<void>}
   */
  async updateUser(id: string, user: Partial<User>, session: ClientSession): Promise<void> {
    await this.updateById(id, user, session);
  }

  /**
   * add project
   * add's a new project to user's object
   * @param {string} id
   * @param {Types.ObjectId} projectId
   * @param {ClientSession} session
   * @return {Promise<void>}
   */
  async addProject(id: string, projectId: Types.ObjectId, session: ClientSession): Promise<void> {
    await this.updateById(id, {
      $push: {
        projects: projectId,
      },
      $set: {
        currentProjectId: projectId,
      },
    }, session);
  }
}
