import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { BaseSchema } from '@/shared/schema';
import { UserLoginProvider, UserStatus } from '@/shared/enums';
import { DEFAULT_SCHEMA_OPTIONS } from '@/shared/constants';

@Schema(DEFAULT_SCHEMA_OPTIONS)
export class User extends BaseSchema {
  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  emailId: string;

  @ApiProperty()
  @Prop()
  mobileNo: string;

  @ApiProperty()
  @Prop()
  password: string;

  @ApiProperty()
  @Prop()
  currentProjectId: Types.ObjectId;

  @ApiProperty()
  @Prop()
  workDomains: string[];

  @ApiProperty()
  @Prop()
  projects: Types.ObjectId[];

  @ApiProperty()
  @Prop({ type: Number, enum: Object.values(UserStatus), required: ['User Status is required'] })
  status: UserStatus;

  @Prop({ type: Number, enum: Object.values(UserLoginProvider) })
  loginProvider: UserLoginProvider;
}

export const UserSchema = SchemaFactory.createForClass(User);
