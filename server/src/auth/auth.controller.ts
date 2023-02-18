import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import LoginDto from './dto/Login.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const user = await this.authService.login(loginDto);

    return this.authService.getAuthorize(user, res);
  }

  @Post('me')
  async me(@Req() req: Request, @Res() res: Response) {
    const user = this.authService.loginByRefreshToken(req);

    return this.authService.getAuthorize(user, res);
  }
}
