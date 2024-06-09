import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { REFRESH_TOKEN_COOKIE_NAME } from '../auth.constants';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

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

    const accessToken = this.extractTokenFromHeader(request);
    const refreshToken = request.cookies[REFRESH_TOKEN_COOKIE_NAME];

    if (!accessToken && !refreshToken) {
      this.logger.error('Access token and refresh token is missing');
      throw new UnauthorizedException();
    }
    const accessTokenVerificationResponse = await this.verifyToken(accessToken);

    if (accessTokenVerificationResponse.verified) {
      // Attach the decoded token and attach user for further use
      request.user_id = accessTokenVerificationResponse.payload.id;
      return true;
    }

    // Verify if refresh token is valid
    const refreshTokenVerificationResponse =
      await this.verifyToken(refreshToken);

    if (!refreshTokenVerificationResponse.verified) {
      throw new UnauthorizedException();
    }

    // Create new access token and attach it for the response interceptor
    request['sync_token'] = await this.authService.createAccessToken(
      refreshTokenVerificationResponse.payload.id,
    );

    request.user_id = refreshTokenVerificationResponse.payload.id;

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
