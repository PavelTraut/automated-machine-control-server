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
    const user = this.usersRepo.create({
      ...addUserDto,
      departament: { id: addUserDto.departamentId },
    });

    return this.usersRepo.save(user);
  }

  getAll() {
    return this.usersRepo.find({relations:['departament']});
  }

  getById(id: string) {
    return this.usersRepo.findOne({ where:{id},relations:['departament'] });
  }

  findByLogin(login: string) {
    return this.usersRepo.findOne({
      where: { login },
      relations: ['departament'],
    });
  }

  update(updateUserDto: UpdateUserDto) {
    return this.usersRepo.update(updateUserDto.id, updateUserDto);
  }

  delete(id: string) {
    return this.usersRepo.delete(id);
  }
}
