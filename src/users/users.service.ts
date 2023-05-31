import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from '../entitys/user.entity';
import { In, Repository } from 'typeorm';
import AddUserDto from './dto/AddUser.dto';
import UpdateUserDto from './dto/UpdateUser.dto';
import RegeneratePassDto from './dto/RegeneratePass.dto';
import { generate } from 'generate-password';
import { hash } from 'bcryptjs';
import getUserLevelByRole from '../utils/getUserLevelByRole';
import GetRolesUnder from '../utils/getRolesUnder';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
  ) {}

  async add(addUserDto: AddUserDto, requester: User) {
    this.compareLevelsByRole(requester, { role: addUserDto.role } as User);

    const realUser = await this.findByLogin(addUserDto.login);
    if (realUser) {
      throw new BadRequestException(
        'Пользователь с таким логином уже существует',
      );
    }

    const user = this.usersRepo.create({
      ...addUserDto,
      specialization: addUserDto.specializationId
        ? { id: addUserDto.specializationId }
        : null,
      departament: addUserDto.departamentId
        ? { id: addUserDto.departamentId }
        : null,
    });

    await this.usersRepo.save(user);

    return this.getById(user.id);
  }

  getAll(requester: User) {
    return this.usersRepo.find({
      relations: ['departament', 'specialization'],
      where: { role: In(GetRolesUnder(requester.role)), isActive: true },
    });
  }

  getById(id: string) {
    return this.usersRepo.findOne({
      relations: ['departament', 'specialization'],
      where: { id },
    });
  }

  getByIdWithCheck(id: string, requester: User) {
    return this.usersRepo.findOne({
      where: { id, role: In(GetRolesUnder(requester.role)) },
      relations: ['departament', 'specialization'],
    });
  }

  findByLogin(login: string) {
    return this.usersRepo.findOne({
      where: { login },
      relations: ['departament'],
    });
  }

  async update(updateUserDto: UpdateUserDto, requester: User) {
    const realUser = await this.findByLogin(updateUserDto.login);
    if (realUser) {
      throw new BadRequestException(
        'Пользователь с таким логином уже существует',
      );
    }

    const user = await this.findOrTrowException(updateUserDto.id);

    this.compareLevelsByRole(requester, user);

    const updated = {
      ...updateUserDto,
      specialization: updateUserDto.specializationId
        ? { id: updateUserDto.specializationId }
        : null,
    };
    delete updated.specializationId;
    await this.usersRepo.update(updateUserDto.id, updated);

    return this.getById(updateUserDto.id);
  }

  async delete(id: string, requester: User) {
    const user = await this.findOrTrowException(id);

    this.compareLevelsByRole(requester, user);

    return this.usersRepo.update(user.id, { isActive: false });
  }

  compareLevelsByRole(requester: User, object: User) {
    if (getUserLevelByRole(requester.role) > getUserLevelByRole(object.role)) {
      return;
    }

    throw new BadRequestException('Нету прав');
  }

  async regeneratePassword({ userId }: RegeneratePassDto, requester: User) {
    const user = await this.findOrTrowException(userId);

    this.compareLevelsByRole(requester, user);

    const password = generate({
      length: 10,
      numbers: true,
      uppercase: false,
    });

    await this.usersRepo.update(userId, {
      password: await new Promise((resolve, reject) => {
        hash(password, 10, function (err, hash) {
          if (err) reject(err);
          resolve(hash);
        });
      }),
    });

    return { newPassword: password };
  }

  async findOrTrowException(userId: string) {
    const user = await this.getById(userId);

    if (!user) {
      throw new BadRequestException('Такого пользователя не существует');
    }
    return user;
  }
}
