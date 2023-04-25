import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Departament from '../entitys/departament.entity';
import AddDepartamentDto from './dto/AddDepartament.dto';
import UpdateDepartamentDto from './dto/UpdateDepartamentDto';

@Injectable()
export class DepartamentsService {
  constructor(
    @InjectRepository(Departament)
    private readonly departamentsRepo: Repository<Departament>,
  ) {}

  getDepartmentById(id: string) {
    return this.departamentsRepo.findOne({
      where: { id },
      relations: ['workers', 'machines'],
    });
  }

  getAll() {
    return this.departamentsRepo.find({ relations: ['workers', 'machines'] });
  }

  async add(addDepartamentDto: AddDepartamentDto) {
    const existedDepartament = await this.departamentsRepo.findOneBy({
      name: addDepartamentDto.name,
    });
    if (existedDepartament) {
      throw new BadRequestException('Цех с таким названием уже сущестувует');
    }

    const departament = this.departamentsRepo.create(addDepartamentDto);

    return this.departamentsRepo.save(departament);
  }

  async update(updateDepartamentDto: UpdateDepartamentDto) {
    const existedDepartament = await this.departamentsRepo.findOneBy({
      name: updateDepartamentDto.name,
    });
    if (existedDepartament) {
      throw new BadRequestException('Цех с таким названием уже сущестувует');
    }

    return this.departamentsRepo.save(updateDepartamentDto);
  }

  delete(id: string) {
    return this.departamentsRepo.delete(id);
  }
}
