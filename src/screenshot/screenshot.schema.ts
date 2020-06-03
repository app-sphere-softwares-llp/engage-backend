import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DEFAULT_SCHEMA_OPTIONS } from '@/shared/constants';
import { Project } from '@/projects/projects.schema';
import { Document, Types } from 'mongoose';
import { User } from '@/users/users.schema';
import { ScreenshotMetaData } from '@/shared/models/screenshot/screenshot.model';
import { generateUtcDate } from '@/shared/utils';

@Schema(DEFAULT_SCHEMA_OPTIONS)
export class ScreenShot extends Document {
  @Prop({ ref: Project.name })
  projectId: Types.ObjectId;

  @Prop({ ref: 'Activity' })
  activityId: Types.ObjectId;

  @Prop()
  url: string;

  @Prop()
  metaData: ScreenshotMetaData;

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

export const ScreenshotSchema = SchemaFactory.createForClass(ScreenShot);
