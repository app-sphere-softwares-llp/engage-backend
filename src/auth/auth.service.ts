import { Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { UsersService } from '@/users/users.service';
import { LoginDto } from '@/auth/dto/login-dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService implements OnModuleInit {
  private userService: UsersService;

  constructor(
    private readonly jwtService: JwtService,
    private readonly moduleRef: ModuleRef,
  ) {
  }

  onModuleInit(): any {
    this.userService = this.moduleRef.get(UsersService.name, { strict: false });
  }

  async login(loginDto: LoginDto): Promise<string> {
    try {
      const user = await this.userService.getUserByEmailId(loginDto.email);

      if (!user) {
        throw new UnauthorizedException('Invalid Credentials');
      }

      // compare hashed password
      const isPasswordMatched = await bcrypt.compare(loginDto.password, user.password);

      if (isPasswordMatched) {
        // await this.userService.updateUser(user.id, {}, )
      } else {
        throw new UnauthorizedException('Invalid Credentials');
      }
      return '';
    } catch (e) {
      throw e;
    }
  }
}
