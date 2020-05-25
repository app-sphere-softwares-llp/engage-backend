import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { requiredField } from '@/shared/utils/validation-errors.utils';

export class LoginUserDto {
  @IsNotEmpty({ message: () => requiredField('email') })
  @IsString()
  // @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @ApiProperty()
  readonly password: string;
}
