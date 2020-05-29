import { Types } from 'mongoose';
import { ProjectMemberTypeEnum } from '@/shared/enums';

export class ProjectDefaultSettings {
  countKeyPresses: boolean = false;
  countMouseClicks: boolean = false;
  rate: number = 0;
  currency: string;
  activityInterValTime: number;
  workingCapacity: number;
  maxAllowedLoggingPerDay: number;
}

export class ProjectMember extends ProjectDefaultSettings {
  memberId: Types.ObjectId;
  type: ProjectMemberTypeEnum;
  tags: string[] = [];
  totalTrackedTime: number = 0;
  costToProject: number = 0;
  workDomains: string[] = [];
  isInviteAccepted: boolean = false;
}
