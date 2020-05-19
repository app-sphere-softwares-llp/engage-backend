import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  readonly name: string;
}
