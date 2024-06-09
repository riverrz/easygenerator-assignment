import { IsEmail, IsString, IsStrongPassword, Matches } from 'class-validator';

export class SignupDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minSymbols: 1,
      minNumbers: 1,
    },
    {
      message:
        'Password must be 8 characters long with atleast 1 letter, number and special character each',
    },
  )
  @Matches(/[a-zA-Z]/g, {
    message: 'Password must contain atleast 1 letter',
  })
  password: string;
}
