import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from '@/users/users.schema';
import { Project } from '@/projects/projects.schema';

export class Invitation {
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
}

export const InvitationSchema = SchemaFactory.createForClass(Invitation);