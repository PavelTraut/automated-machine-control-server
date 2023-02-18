import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import CryptoService from '../services/crypto.service';
import { UsersModule } from '../users/users.module';
import JwtService from '../services/jwt.service';
import CookiesService from '../services/cookies.service';

@Module({
  providers: [AuthService, CryptoService, JwtService, CookiesService],
  controllers: [AuthController],
  imports: [UsersModule],
})
export class AuthModule {}
