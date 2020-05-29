import { BaseSchema } from '@/shared/schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DEFAULT_SCHEMA_OPTIONS } from '@/shared/constants';
import { Types } from 'mongoose';
import { User } from '@/users/users.schema';


@Schema(DEFAULT_SCHEMA_OPTIONS)
export class Attachment extends BaseSchema {
  @Prop()
  name: string;

  @Prop()
  mimeType: string;

  @Prop()
  url: string;

  @Prop({ required: ['Created by is required'], ref: User.name })
  createdById: Types.ObjectId;
}

export const AttachmentSchema = SchemaFactory.createForClass(Attachment);
