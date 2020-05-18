import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { BaseSchema } from '@/shared/schema';

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
}

export const UserSchema = SchemaFactory.createForClass(User);
