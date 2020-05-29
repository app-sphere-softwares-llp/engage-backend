import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
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
