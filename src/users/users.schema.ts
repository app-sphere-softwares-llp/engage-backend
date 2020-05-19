import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { BaseSchema } from '@/shared/schema';
import { UserStatus } from '@/shared/enums';

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
  @Prop({ type: String, enum: Object.values(UserStatus), required: ['User Status is required'] })
  status: UserStatus;
}

export const UserSchema = SchemaFactory.createForClass(User);
