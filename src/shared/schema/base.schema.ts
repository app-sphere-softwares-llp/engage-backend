import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import { User } from '@/users/users.schema';

export class BaseSchema extends Document {
  @Prop({ ref: User.name })
  updatedById: Types.ObjectId;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ ref: User.name })
  deletedById: Types.ObjectId;

  @Prop()
  deletedAt: Date;

  @Prop()
  version: number;

  @Prop()
  lastSyncTime: Date;
}
