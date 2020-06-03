import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DEFAULT_SCHEMA_OPTIONS } from '@/shared/constants';
import { Document, Types } from 'mongoose';
import { User } from '@/users/users.schema';
import { generateUtcDate } from '@/shared/utils';


@Schema(DEFAULT_SCHEMA_OPTIONS)
export class Attachment extends Document {
  @Prop()
  name: string;

  @Prop()
  mimeType: string;

  @Prop()
  url: string;

  @Prop({ required: ['Created by is required'], ref: User.name })
  createdById: Types.ObjectId;

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

export const AttachmentSchema = SchemaFactory.createForClass(Attachment);
