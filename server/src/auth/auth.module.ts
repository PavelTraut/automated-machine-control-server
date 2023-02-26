import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { CookiesModule } from '../cookies/cookies.module';
import { JwtModule } from '../jwt/jwt.module';
import { CryptoModule } from '../crypto/crypto.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [UsersModule, CookiesModule, JwtModule, CryptoModule],
  exports: [AuthService],
})
export class AuthModule {}
