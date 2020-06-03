import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProjectDefaultSettings, ProjectMember } from '@/shared/models';
import { Document, Types } from 'mongoose';
import { DEFAULT_SCHEMA_OPTIONS } from '@/shared/constants';
import { User } from '@/users/users.schema';
import { generateUtcDate } from '@/shared/utils';
import { ApiProperty } from '@nestjs/swagger';

@Schema(DEFAULT_SCHEMA_OPTIONS)
export class Project extends Document {
  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  details: string;

  @ApiProperty()
  @Prop()
  tags: string[];

  @ApiProperty()
  @Prop()
  startDate: Date;

  @ApiProperty()
  @Prop()
  endDate: Date;

  @ApiProperty()
  @Prop({ default: 0 })
  totalTrackedTime: number;

  @ApiProperty()
  @Prop({ default: 0 })
  totalCostOfProject: number;

  @ApiProperty()
  @Prop({ default: 0 })
  totalEstimatedTime: number;

  @ApiProperty()
  @Prop()
  projectLogoUrl: string;

  @ApiProperty()
  @Prop()
  alias: string;

  @ApiProperty()
  @Prop()
  defaultSettings: ProjectDefaultSettings;

  @ApiProperty()
  @Prop({ type: Array, default: [] })
  members: ProjectMember[];

  @ApiProperty()
  @Prop({ required: ['Created by is required'], ref: User.name })
  createdById: Types.ObjectId;

  @ApiProperty()
  @Prop({ ref: 'User' })
  updatedById: Types.ObjectId;

  @ApiProperty()
  @Prop({ default: false })
  isDeleted: boolean;

  @ApiProperty()
  @Prop({ ref: 'User' })
  deletedById: Types.ObjectId;

  @ApiProperty()
  @Prop()
  deletedAt: Date;

  @ApiProperty()
  @Prop({ default: 1 })
  version: number;

  @ApiProperty()
  @Prop({ default: generateUtcDate() })
  lastSyncTime: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
