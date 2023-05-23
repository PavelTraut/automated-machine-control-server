import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from '../entitys/user.entity';
import { Repository } from 'typeorm';
import AddUserDto from './dto/AddUser.dto';
import UpdateUserDto from './dto/UpdateUser.dto';
import RegeneratePassDto from './dto/RegeneratePass.dto';
import { generate } from 'generate-password';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
  ) {}

  async add(addUserDto: AddUserDto) {
    const realUser = await this.findByLogin(addUserDto.login);
    if (realUser) {
      throw new BadRequestException(
        'Пользователь с таким логином уже существует',
      );
    }

    const user = this.usersRepo.create({
      ...addUserDto,
      departament: addUserDto.departamentId
        ? { id: addUserDto.departamentId }
        : null,
    });

    return this.usersRepo.save(user);
  }

  getAll() {
    return this.usersRepo.find({
      relations: ['departament'],
      where: { role: 'user', isActive: true },
    });
  }

  getById(id: string) {
    return this.usersRepo.findOne({
      where: { id },
      relations: ['departament'],
    });
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
    return this.usersRepo.update(id, { isActive: false });
  }

  async regeneratePassword({ userId }: RegeneratePassDto) {
    const user = await this.getById(userId);

    if (!user) {
      throw new BadRequestException('Такого пользователя не существует');
    }

    const password = generate({
      length: 10,
      numbers: true,
      uppercase: false,
    });

    await this.usersRepo.update(userId, { password });

    return password;
  }
}
