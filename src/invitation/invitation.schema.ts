import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '@/users/users.schema';
import { Project } from '@/projects/projects.schema';
import { generateUtcDate } from '@/shared/utils';

export class Invitation extends Document {
  @Prop({ ref: User.name })
  memberId: Types.ObjectId;

  @Prop({ ref: User.name })
  invitedById: Types.ObjectId;

  @Prop()
  memberEmailId: string;

  @Prop({ ref: Project.name })
  projectId: Types.ObjectId;

  @Prop({ default: false })
  isInviteAccepted: boolean;

  @Prop()
  invitedAt: Date;

  @Prop({ default: false })
  isExpired: boolean;

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

export const InvitationSchema = SchemaFactory.createForClass(Invitation);
