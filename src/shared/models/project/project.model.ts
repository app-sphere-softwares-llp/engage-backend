import { Types } from 'mongoose';

export class ProjectDefaultSettings {
  countKeyPresses: boolean;
  countMouseClicks: boolean;
  rate: number;
  activityInterValTime: number;
  workingCapacity: number;
  maxAllowedLoggingPerDay: number;
}

export class ProjectMember extends ProjectDefaultSettings {
  memberId: Types.ObjectId;
  type: '';
  tags: string[];
  totalTrackedTime: number;
  costToProject: number;
  workDomains: string[];
}
