import * as bcrypt from 'bcrypt';

import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Request, Response } from 'express';
import { LoginDto } from '../dtos/login.dto';
import { SignupDto } from '../dtos/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(
    @Res({ passthrough: true }) res: Response,
    @Body() body: SignupDto,
  ) {
    const { email, name, password } = body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate the access tokens
    const { accessToken, refreshToken } = await this.createAuthTokens('123');

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    return { accessToken };
  }

  @Post('login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() body: LoginDto,
  ) {
    const { email, password } = body;

    // Fetch the user with the email and then compare the hashed password

    // Generate the access tokens
    const { accessToken, refreshToken } = await this.createAuthTokens('123');

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    return { accessToken };
  }

  private async createAuthTokens(userId: string) {
    const accessToken = await this.authService.createAccessToken(userId);
    const refreshToken = await this.authService.createRefreshToken(userId);

    return {
      accessToken,
      refreshToken,
    };
  }
}
