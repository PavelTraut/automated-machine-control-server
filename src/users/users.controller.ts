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

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  @Roles('admin')
  add(@Body() addUserDto: AddUserDto) {
    return this.usersService.add(addUserDto);
  }

  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.usersService.getById(id);
  }

  @Put()
  @Roles('admin')
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @Delete(':id')
  @Roles('admin')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }

  @Patch('regenerate-pass')
  regeneratePass(@Body() dto: RegeneratePassDto) {
    return this.usersService.regeneratePassword(dto);
  }
}
