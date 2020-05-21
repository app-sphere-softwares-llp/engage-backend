import { Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_SECRET_KEY } from '@/shared/constants';
import { UsersService } from '@/users/users.service';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) implements OnModuleInit {
  private userService: UsersService;

  constructor(private moduleRef: ModuleRef) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: JWT_SECRET_KEY,
    });
  }

  onModuleInit(): any {
    this.userService = this.moduleRef.get(UsersService.name, { strict: false });
  }

  async validate(payload: any) {
    const userDetails = await this.userService
      .getUserByEmailId(payload.sub);
    if (!userDetails) {
      this._generalService.userId = null;
      this._generalService.userType = null;
      throw new UnauthorizedException();
    }
    return {
      ...userDetails,
    };
  }
}
