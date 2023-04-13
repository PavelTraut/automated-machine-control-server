import { NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import AppRequest from '../types/AppRequest';
import { UsersService } from '../users/users.service';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private authService: AuthService,
    private jwtServise: JwtService,
    private usersService: UsersService,
  ) {}

  async use(req: AppRequest, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (token) {
      try {
        const jwtUser = this.jwtServise.verifyAccessToken(token);
        const realUser = await this.usersService.getById(jwtUser.id);

        req.user = realUser;
      } catch {}
    }
    next();
  }
}
