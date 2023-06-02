import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from '../guards/role.guard';
import AddUserDto from './dto/AddUser.dto';
import { UsersService } from './users.service';
import Roles from '../decorators/roles.decorator';
import UpdateUserDto from './dto/UpdateUser.dto';
import RegeneratePassDto from './dto/RegeneratePass.dto';
import GetUser from '../decorators/get-user.decorator';
import User from '../entitys/user.entity';

@Controller('users')
// @UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  @Roles('admin')
  add(@Body() addUserDto: AddUserDto, @GetUser() user: User) {
    return this.usersService.add(addUserDto, user);
  }

  @Get()
  @Roles('all')
  getAll(@GetUser() user: User) {
    return this.usersService.getAll(user);
  }

  @Get(':id')
  @Roles('all')
  getById(@Param('id') id: string, @GetUser() user: User) {
    return this.usersService.getByIdWithCheck(id, user);
  }

  @Put()
  @Roles('admin')
  update(@Body() updateUserDto: UpdateUserDto, @GetUser() user: User) {
    return this.usersService.update(updateUserDto, user);
  }

  @Delete(':id')
  @Roles('admin')
  delete(@Param('id') id: string, @GetUser() user: User) {
    return this.usersService.delete(id, user);
  }

  @Patch('regenerate-pass')
  @Roles('admin')
  regeneratePass(@Body() dto: RegeneratePassDto, @GetUser() user: User) {
    return this.usersService.regeneratePassword(dto, user);
  }
}
