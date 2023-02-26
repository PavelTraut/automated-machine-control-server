import { Injectable } from '@nestjs/common';
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
      relations: ['workers'],
    });
  }

  getAll() {
    return this.departamentsRepo.find({ relations: ['users'] });
  }

  add(addDepartamentDto: AddDepartamentDto) {
    const departament = this.departamentsRepo.create(addDepartamentDto);

    return this.departamentsRepo.save(departament);
  }

  update(updateDepartamentDto: UpdateDepartamentDto) {
    return this.departamentsRepo.update(
      updateDepartamentDto.id,
      updateDepartamentDto,
    );
  }

  delete(id: string) {
    return this.departamentsRepo.delete(id);
  }
}
