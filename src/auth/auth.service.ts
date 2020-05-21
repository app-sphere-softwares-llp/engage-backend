import { Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { LoginUserDto } from '@/auth/dto/login-user-dto';
import { JwtService } from '@nestjs/jwt';
import { BaseService } from '@/shared/services';
import { User } from '@/users/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { RegisterUserDto } from '@/auth/dto/register-user-dto';
import { UsersService } from '@/users/users.service';
import { UserLoginProvider, UserStatus } from '@/shared/enums';
import * as bcrypt from 'bcrypt';
import { JwtResponse } from '@/shared/models';

@Injectable()
export class AuthService extends BaseService<User> implements OnModuleInit {
  private userService: UsersService;

  constructor(
    private readonly jwtService: JwtService,
    private readonly moduleRef: ModuleRef,
    @InjectModel(User.name) protected readonly userModel: Model<User>,
  ) {
    super(userModel);
  }

  onModuleInit(): any {
    this.userService = this.moduleRef.get(UsersService.name, { strict: false });
  }

  async login(loginDto: LoginUserDto): Promise<JwtResponse> {
    return await this.withRetrySession(async (session: ClientSession) => {
      const user = await this.userService.getUserByEmailId(loginDto.email);

      if (!user) {
        throw new UnauthorizedException('Invalid Credentials');
      }

      // compare hashed password
      const isPasswordMatched = await bcrypt.compare(loginDto.password, user.password);

      if (isPasswordMatched) {
        await this.userService.updateUser(user.id, { loginProvider: UserLoginProvider.Web }, session);

        return {
          accessToken: this.jwtService.sign({ sub: user.emailId, id: user.id }),
        };
      } else {
        throw new UnauthorizedException('Invalid Credentials');
      }
    });
  }

  async register(registerUserDto: RegisterUserDto): Promise<JwtResponse> {
    return await this.withRetrySession(async (session: ClientSession) => {
      const user = await this.userService.getUserByEmailId(registerUserDto.email);

      if (user) {
        throw new UnauthorizedException('User already exists');
      }

      // create new user model
      const newUserModel = new this.userModel(registerUserDto);
      newUserModel.loginProvider = UserLoginProvider.Web;
      newUserModel.status = UserStatus.Active;

      // save user to db
      const newUser = await this.userService.createUser(newUserModel, session);

      // return new jwt token
      return {
        accessToken: this.jwtService.sign({ sub: newUser[0].emailId, id: newUser[0].id }),
      };

    });
  }
}
