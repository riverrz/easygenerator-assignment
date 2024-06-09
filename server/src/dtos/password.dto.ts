import { IsStrongPassword } from 'class-validator';

export class PasswordDto {
  @IsStrongPassword(
    {
      minLength: 8,
      minSymbols: 1,
      minNumbers: 1,
      minLowercase: 1,
      minUppercase: 1,
    },
    {
      message:
        'Password must be 8 characters long with atleast 1 uppercase and lowercase letters, number and special character each',
    },
  )
  password: string;
}
