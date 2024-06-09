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

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  async signUp(
    @Res({ passthrough: true }) res: Response,
    @Body() body: SignupDto,
  ) {
    const { email, name, password } = body;

    await this.userService.create({ name, email, password });

    return true;
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
