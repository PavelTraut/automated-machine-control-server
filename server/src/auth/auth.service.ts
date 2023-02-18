import { Injectable, UnauthorizedException } from '@nestjs/common';
import LoginDto from './dto/Login.dto';
import CryptoService from '../services/crypto.service';
import { UsersService } from '../users/users.service';
import User from '../entitys/user.entity';
import JwtService from '../services/jwt.service';
import CookiesService from '../services/cookies.service';
import AuthResponseDto from './dto/AuthResponse.dto';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly cookiesService: CookiesService,
  ) {}
  async login({ password, login }: LoginDto): Promise<User> {
    const user = await this.usersService.findByLogin(login);
    if (!user) {
      this.throwUnauthorizedException();
    }

    const isPasswordEqual = this.cryptoService.compare(user.password, password);
    if (!isPasswordEqual) {
      this.throwUnauthorizedException();
    }

    return user;
  }

  getAuthorize(user: User, res: Response): AuthResponseDto {
    const accessToken = this.jwtService.generateAccessToken(user);
    const refreshToken = this.jwtService.generateAccessToken(user);

    this.cookiesService.setRefreshToken(res, refreshToken);

    return {
      user,
      accessToken,
    };
  }

  loginByRefreshToken(req: Request) {
    const token = this.cookiesService.getRefreshToken(req);

    return this.jwtService.verifyRefreshToken(token) as User;
  }

  private throwUnauthorizedException() {
    throw new UnauthorizedException(
      'User with this login and password,not exist!',
    );
  }
}
