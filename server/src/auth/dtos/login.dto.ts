import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  email: string;

  @IsEmail()
  password: string;
}
