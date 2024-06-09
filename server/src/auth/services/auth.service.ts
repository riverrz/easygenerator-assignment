import * as bcrypt from 'bcrypt';

import { v4 as uuid } from 'uuid';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ACCESS_TOKEN_EXPIRY } from '../auth.constants';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService
      .findOne({ email })
      .select('+password')
      .lean();

    if (!user) {
      throw new NotFoundException('User with email/password was not found');
    }
    const { password: savedPassword, ...userDetails } = user;

    const isPasswordMatching = await bcrypt.compare(password, savedPassword);
    if (!isPasswordMatching) {
      throw new NotFoundException('User with email/password was not found');
    }

    return userDetails;
  }

  createAccessToken(userId: string) {
    return this.jwtService.signAsync(
      { id: userId },
      { expiresIn: ACCESS_TOKEN_EXPIRY },
    );
  }

  private createRefreshToken(userId: string) {
    const tokenId = uuid();
    return this.jwtService.signAsync(
      { id: userId, tokenId },
      { expiresIn: '7d' },
    );
  }

  async createAuthTokens(userId: string) {
    const accessToken = await this.createAccessToken(userId);
    const refreshToken = await this.createRefreshToken(userId);

    return {
      accessToken,
      refreshToken,
    };
  }
}
