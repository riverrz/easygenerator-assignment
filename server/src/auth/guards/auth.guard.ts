import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { REFRESH_TOKEN_COOKIE_NAME } from '../auth.constants';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private authService: AuthService,
  ) {}

  private async verifyToken(
    token: string,
  ): Promise<{ verified: true; payload: any } | { verified: false }> {
    const jwtSecret = this.configService.getOrThrow('JWT_SECRET_TOKEN');

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtSecret,
      });
      return { verified: true, payload };
    } catch (error) {
      return { verified: false };
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);
    const refreshToken = request.cookies[REFRESH_TOKEN_COOKIE_NAME];

    if (!token && !refreshToken) {
      throw new UnauthorizedException();
    }
    const accessTokenVerificationResponse = await this.verifyToken(token);

    if (accessTokenVerificationResponse.verified) {
      // Attach the decoded token and attach to request for further use
      request['user'] = accessTokenVerificationResponse.payload;
      return true;
    }

    // Verify if refresh token is valid
    const refreshTokenVerificationResponse = await this.verifyToken(token);
    if (!refreshTokenVerificationResponse.verified) {
      throw new UnauthorizedException();
    }

    // Create new access token and attach it to request for the response interceptor
    request['sync_token'] = await this.authService.createAccessToken(
      refreshTokenVerificationResponse.payload.id,
    );
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
