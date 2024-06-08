import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  createAccessToken(userId: string) {
    return this.jwtService.signAsync({ id: userId }, { expiresIn: '15m' });
  }

  createRefreshToken(userId: string) {
    const tokenId = uuid();
    return this.jwtService.signAsync(
      { id: userId, tokenId: tokenId },
      { expiresIn: '7d' },
    );
  }
}
