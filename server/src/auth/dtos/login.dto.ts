import { IsEmail } from 'class-validator';
import { PasswordDto } from 'src/dtos/password.dto';

export class LoginDto extends PasswordDto {
  @IsEmail()
  email: string;
}
