import { BaseSchema } from '@/shared/schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DEFAULT_SCHEMA_OPTIONS } from '@/shared/constants';
import { Project } from '@/projects/projects.schema';
import { Types } from 'mongoose';
import { Activity } from '@/activity/activity.schema';
import { User } from '@/users/users.schema';
import { ScreenshotMetaData } from '@/shared/models/screenshot/screenshot.model';

@Schema(DEFAULT_SCHEMA_OPTIONS)
export class ScreenShot extends BaseSchema {
  @Prop({ ref: Project.name })
  projectId: Types.ObjectId;

  @Prop({ ref: Activity.name })
  activityId: Types.ObjectId;

  @Prop()
  url: string;

  @Prop()
  metaData: ScreenshotMetaData;

  @Prop({ required: ['Created by is required'], ref: User.name })
  createdById: Types.ObjectId;
}

export const ScreenshotSchema = SchemaFactory.createForClass(ScreenShot);
