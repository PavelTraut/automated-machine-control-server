import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from '../entitys/user.entity';
import { Repository } from 'typeorm';
import AddUserDto from './dto/AddUser.dto';
import UpdateUserDto from './dto/UpdateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
  ) {}

  add(addUserDto: AddUserDto) {
    const user = this.usersRepo.create(addUserDto);

    return this.usersRepo.save(user);
  }

  getAll() {
    return this.usersRepo.find();
  }

  getById(id: string) {
    return this.usersRepo.findOneBy({ id });
  }

  findByLogin(login: string) {
    return this.usersRepo.findOneBy({ login });
  }

  update(updateUserDto: UpdateUserDto) {
    return this.usersRepo.update(updateUserDto.id, updateUserDto);
  }

  delete(id: string) {
    return this.usersRepo.delete(id);
  }
}
