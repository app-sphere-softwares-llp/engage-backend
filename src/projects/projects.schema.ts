import { BaseSchema } from '@/shared/schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProjectDefaultSettings, ProjectMember } from '@/shared/models';
import { Types } from 'mongoose';
import { DEFAULT_SCHEMA_OPTIONS } from '@/shared/constants';
import { User } from '@/users/users.schema';

@Schema(DEFAULT_SCHEMA_OPTIONS)
export class Project extends BaseSchema {
  @Prop()
  name: string;

  @Prop()
  details: string;

  @Prop()
  tags: string[];

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop({ default: 0 })
  totalTrackedTime: number;

  @Prop({ default: 0 })
  totalCostOfProject: number;

  @Prop({ default: 0 })
  totalEstimatedTime: number;

  @Prop()
  projectLogoUrl: string;

  @Prop()
  alias: string;

  @Prop()
  defaultSettings: ProjectDefaultSettings;

  @Prop({ type: Array, default: [] })
  members: ProjectMember[];

  @Prop({ required: ['Created by is required'], ref: User.name })
  createdById: Types.ObjectId;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
