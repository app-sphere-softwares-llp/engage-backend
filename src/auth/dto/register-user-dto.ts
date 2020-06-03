import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsString()
  @IsEmail()
  @ApiProperty()
  readonly emailId: string;

  @IsNotEmpty({ message: 'Mobile No is required' })
  @IsString()
  @ApiProperty()
  readonly mobileNo: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @ApiProperty()
  readonly password: string;

  @IsNotEmpty({ message: 'Please add your working domain' })
  @IsArray()
  @ApiProperty()
  readonly workDomains: string[];
}
