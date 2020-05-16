import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  readonly name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail()
  readonly email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  readonly password: string;

  @IsNotEmpty({ message: 'Mobile no is required' })
  @IsString()
  readonly mobileNo: string;

  readonly currentProjectId: string;

  readonly workDomains: string[];

  readonly projects: string[];
}
