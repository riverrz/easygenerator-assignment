import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
  imports: [
    JwtModule.register({
      secret: 'yourSecretKey', // Note: In real applications, use something more secure and environment-specific
      signOptions: { expiresIn: '15m' }, // short-lived
    }),
  ],
})
export class AuthModule {}
