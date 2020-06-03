import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserLoginProvider, UserStatus } from '@/shared/enums';
import { DEFAULT_SCHEMA_OPTIONS } from '@/shared/constants';
import { generateUtcDate } from '@/shared/utils';

@Schema(DEFAULT_SCHEMA_OPTIONS)
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  emailId: string;

  @Prop()
  mobileNo: string;

  @Prop()
  password: string;

  @Prop()
  currentProjectId: Types.ObjectId;

  @Prop()
  workDomains: string[];

  @Prop()
  projects: Types.ObjectId[];

  @Prop({ type: Number, enum: Object.values(UserStatus), required: ['User Status is required'] })
  status: UserStatus;

  @Prop({ type: Number, enum: Object.values(UserLoginProvider) })
  loginProvider: UserLoginProvider;

  @Prop({ ref: 'User' })
  updatedById: Types.ObjectId;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ ref: 'User' })
  deletedById: Types.ObjectId;

  @Prop()
  deletedAt: Date;

  @Prop({ default: 1 })
  version: number;

  @Prop({ default: generateUtcDate() })
  lastSyncTime: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);
