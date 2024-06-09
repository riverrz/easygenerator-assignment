import {
  Request,
  Body,
  Controller,
  Get,
  Post,
  Res,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Response } from 'express';
import { SignupDto } from '../dtos/signup.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AuthService } from 'src/auth/services/auth.service';
import { ConfigService } from '@nestjs/config';
import { REFRESH_TOKEN_COOKIE_NAME } from 'src/auth/auth.constants';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Post('signup')
  async signUp(
    @Res({ passthrough: true }) res: Response,
    @Body() body: SignupDto,
  ) {
    const { email, name, password } = body;

    const user = await this.userService.create({ name, email, password });

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

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.userService.findOne({ _id: req.user_id });

    if (!user) {
      throw new NotFoundException('User with provided id was not found');
    }

    return user;
  }
}
