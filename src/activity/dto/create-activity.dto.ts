import { IsDate, IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Transform } from 'class-transformer';
import { toObjectId } from '@/shared/utils';
import { ActivityTypeEnum } from '@/shared/enums/activity/activity.enum';

export class CreateActivityDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty({ message: 'Details is required' })
  @IsString()
  @ApiProperty()
  readonly details: string;

  @IsNotEmpty({ message: 'Please select a project' })
  @IsMongoId()
  @Transform(toObjectId)
  @ApiProperty()
  readonly projectId: Types.ObjectId;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  startDate: Date;

  @IsNotEmpty({ groups: ['end-activity'] })
  @IsDate()
  @ApiProperty()
  endDate: Date;

  @ApiProperty()
  keyPressCount: Date;

  @ApiProperty()
  mouseClickCounts: number;

  @ApiProperty()
  trackedTime: number;

  @ApiProperty()
  idleTime: number;

  @ApiProperty()
  urlVisited: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  activityType: ActivityTypeEnum;
}
