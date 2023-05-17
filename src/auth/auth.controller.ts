import { RolesGuard } from './../guards/role.guard';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import LoginDto from './dto/Login.dto';
import { AuthService } from './auth.service';
import GetUser from 'src/decorators/get-user.decorator';
import User from 'src/entitys/user.entity';
import Roles from 'src/decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.getAuthorize(
      await this.authService.login(loginDto),
    );
  }

  @Post('me')
  @UseGuards(RolesGuard)
  @Roles('all')
  me(@GetUser() user: User) {
    return this.authService.getAuthorize(user);
  }
}
