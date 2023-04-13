import { Injectable, UnauthorizedException } from '@nestjs/common';
import LoginDto from './dto/Login.dto';
import { UsersService } from '../users/users.service';
import User from '../entitys/user.entity';
import AuthResponseDto from './dto/AuthResponse.dto';
import { Request, Response } from 'express';
import { JwtService } from '../jwt/jwt.service';
import { CryptoService } from '../crypto/crypto.service';
import { CookiesService } from '../cookies/cookies.service';

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

  getAuthorize(user: User): AuthResponseDto {
    const accessToken = this.jwtService.generateAccessToken(user);

    return {
      user,
      accessToken,
    }
  }

  // loginByRefreshToken(token:string) {
    // return this.jwtService.verifyRefreshToken(token) as User;
  // }

  private throwUnauthorizedException() {
    throw new UnauthorizedException(
      'User with this login and password,not exist!',
    );
  }
}
