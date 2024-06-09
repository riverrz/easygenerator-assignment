import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Response } from 'express';
import { LoginDto } from '../dtos/login.dto';
import { REFRESH_TOKEN_COOKIE_NAME } from '../auth.constants';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() body: LoginDto,
  ) {
    const { email, password } = body;

    const user = await this.authService.login(email, password);

    // Generate the access tokens
    const { accessToken, refreshToken } =
      await this.authService.createAuthTokens(user._id.toString());

    const isProductionEnv = this.configService.get('APP_ENV') === 'production';
    res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
      httpOnly: true,
      secure: isProductionEnv,
      sameSite: isProductionEnv ? 'strict' : 'lax',
    });

    return { accessToken, user };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    const isProductionEnv = this.configService.get('APP_ENV') === 'production';

    res.clearCookie(REFRESH_TOKEN_COOKIE_NAME, {
      httpOnly: true,
      secure: isProductionEnv,
      sameSite: isProductionEnv ? 'strict' : 'lax',
    });

    return { message: 'Logged out successfully' };
  }
}
