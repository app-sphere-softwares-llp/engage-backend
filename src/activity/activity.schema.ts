import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DEFAULT_SCHEMA_OPTIONS } from '@/shared/constants';
import { Document, Types } from 'mongoose';
import { Project } from '@/projects/projects.schema';
import { User } from '@/users/users.schema';
import { ScreenShot } from '@/screenshot/screenshot.schema';
import { ActivityTypeEnum } from '@/shared/enums/activity/activity.enum';
import { generateUtcDate } from '@/shared/utils';

@Schema(DEFAULT_SCHEMA_OPTIONS)
export class Activity extends Document {
  @Prop()
  name: string;

  @Prop()
  details: string;

  @Prop({ ref: Project.name })
  projectId: Types.ObjectId;

  @Prop({ ref: ScreenShot.name })
  screenShotAttachmentId: Types.ObjectId;

  @Prop()
  startedAt: Date;

  @Prop()
  endedAt: Date;

  @Prop()
  keyPressCount: number;

  @Prop()
  mouseClickCounts: number;

  @Prop()
  trackedTime: number;

  @Prop()
  idleTime: number;

  @Prop()
  urlVisited: string[];

  @Prop({ type: Number, enum: Object.values(ActivityTypeEnum) })
  activityType: ActivityTypeEnum;

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

export const ActivitySchema = SchemaFactory.createForClass(Activity);
