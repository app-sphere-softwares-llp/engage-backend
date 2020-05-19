import { BaseSchema } from '@/shared/schema';
import { ApiProperty } from '@nestjs/swagger';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { ProjectDefaultSettings, ProjectMember } from '@/shared/models';

export class Project extends BaseSchema {
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
  @Prop()
  totalEstimatedTime: number;

  @ApiProperty()
  @Prop()
  totalTrackedTime: number;

  @ApiProperty()
  @Prop()
  totalCostOfProject: number;

  @ApiProperty()
  @Prop()
  projectLogo: string;

  @ApiProperty()
  @Prop()
  alias: string;

  @ApiProperty()
  @Prop()
  defaultSettings: ProjectDefaultSettings;

  @ApiProperty()
  @Prop({ type: Array, default: [] })
  members: ProjectMember[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
