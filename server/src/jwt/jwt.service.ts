import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import User from '../entitys/user.entity';
import { sign, verify } from 'jsonwebtoken';
import getAccessTime from '../utils/getAccessTimes';
import getRefreshTime from '../utils/getRefreshTimes';
import JwtUser from '../types/JwtUser';

@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}

  generateAccessToken({ id, role }: User) {
    return sign({ id, role }, this.getAccessSecret(), {
      expiresIn: getAccessTime().toString(),
    });
  }

  generateRefreshToken({ role, id }: User) {
    return sign({ id, role }, this.getRefreshSecret(), {
      expiresIn: getRefreshTime().toString(),
    });
  }

  verifyAccessToken(token: string) {
    return verify(token, this.getAccessSecret()) as JwtUser;
  }

  verifyRefreshToken(token: string) {
    return verify(token, this.getRefreshSecret()) as JwtUser;
  }

  private getAccessSecret() {
    return this.configService.get('JWT_ACCESS_SECRET_KEY');
  }
  private getRefreshSecret() {
    return this.configService.get('JWT_REFRESH_SECRET_KEY');
  }
}
