import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';

import { UserModule } from 'src/user/user.module';
import { AuthGuard } from './guards/auth.guard';

@Module({
  providers: [AuthService, AuthGuard],
  controllers: [AuthController],
  exports: [AuthService, AuthGuard],
  imports: [forwardRef(() => UserModule)],
})
export class AuthModule {}
