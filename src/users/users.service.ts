import { User } from './users.schema';
import { ClientSession, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@/shared/services';
import { CreateUserDto } from './dto/create-user-dto';
import { UserStatus } from '@/shared/enums';
import { QueryModel } from '@/shared/models';

export class UsersService extends BaseService<User> {
  constructor(@InjectModel(User.name) protected readonly userModel: Model<User>) {
    super(userModel);
  }

  addUpdate(createUserDto: CreateUserDto) {
    return this.withRetrySession((session: ClientSession) => {
      return this.create(createUserDto, session);
    });
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
