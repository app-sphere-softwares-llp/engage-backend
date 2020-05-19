import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  readonly password: string;
}
