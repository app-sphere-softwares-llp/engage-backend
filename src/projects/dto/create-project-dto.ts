import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Transform } from 'class-transformer';
import { toObjectId } from '@/shared/utils';

export class CreateProjectDto {

  @IsNotEmpty({ groups: ['update'] })
  @Transform(toObjectId, { groups: ['update'] })
  @IsMongoId({ groups: ['update'] })
  readonly id: Types.ObjectId;

  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty({ message: 'Details is required' })
  @IsString()
  @ApiProperty()
  readonly details: string;

  @ApiProperty()
  readonly tags: string[];

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @IsNotEmpty({ message: 'Project Alias is required' })
  @IsString()
  @ApiProperty()
  alias: string;
}
