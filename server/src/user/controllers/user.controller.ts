import {
  Request,
  Body,
  Controller,
  Get,
  Post,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Response } from 'express';
import { SignupDto } from '../dtos/signup.dto';
import { AuthService } from 'src/auth/services/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
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
      await this.authService.createAuthTokens('123');

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    return { accessToken, user };
  }

  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.userService.findOne({ _id: req.user.id });

    if (!user) {
      throw new NotFoundException('User with provided id was not found');
    }

    return user;
  }
}
