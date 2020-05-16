import { User } from './users.schema';
import { ClientSession, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@src/shared/services';
import { CreateUserDto } from './dto/create-user-dto';

export class UsersService extends BaseService<User> {
  constructor(@InjectModel(User.name) protected readonly userModel: Model<User>) {
    super(userModel);
  }

  addUpdate(createUserDto: CreateUserDto) {
    return this.withRetrySession((session: ClientSession) => {
      return this.create(createUserDto, session);
    });
  }
}
