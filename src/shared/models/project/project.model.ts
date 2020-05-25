import { Types } from 'mongoose';
import { ProjectMemberTypeEnum } from '@/shared/enums';

export class ProjectDefaultSettings {
  countKeyPresses: boolean;
  countMouseClicks: boolean;
  rate: number;
  currency: string;
  activityInterValTime: number;
  workingCapacity: number;
  maxAllowedLoggingPerDay: number;
}

export class ProjectMember extends ProjectDefaultSettings {
  memberId: Types.ObjectId;
  type: ProjectMemberTypeEnum;
  tags: string[];
  totalTrackedTime: number;
  costToProject: number;
  workDomains: string[];
  isInviteAccepted: boolean;
}
