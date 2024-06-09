import { IsEmail, IsString } from 'class-validator';
import { PasswordDto } from 'src/dtos/password.dto';

export class SignupDto extends PasswordDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
