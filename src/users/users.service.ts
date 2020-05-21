import { User } from './users.schema';
import { ClientSession, Model } from 'mongoose';
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
   * @param email
   */
  async getUserByEmailId(email: string): Promise<User> {
    const params: QueryModel = {
      filter: { email, status: UserStatus.Active },
    };
    return await this.findOne(params);
  }

  /**
   * get user by mobile no
   * @param mobileNo
   */
  async getUserByMobileNo(mobileNo: string): Promise<User> {
    const params: QueryModel = {
      filter: { mobileNo, status: UserStatus.Active },
    };
    return await this.findOne(params);
  }

  /**
   * create user
   * @param user
   * @param session
   */
  async createUser(user: Partial<User>, session: ClientSession): Promise<User> {
    return await this.create(user, session) as User;
  }

  /**
   * update user
   * update user by id
   * @param id
   * @param user
   * @param session
   */
  async updateUser(id: string, user: Partial<User>, session: ClientSession): Promise<void> {
    await this.updateById(id, user, session);
  }
}
