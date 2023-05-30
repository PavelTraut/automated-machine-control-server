import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Specialization from '../entitys/specialization.entity';
import AddSpecializationDto from './dto/AddSpecialization.dto';
import UpdateSpecializationDto from './dto/UpdateSpecialization.dto';

@Injectable()
export class SpecializationsService {
  constructor(
    @InjectRepository(Specialization)
    private readonly specializationsRepository: Repository<Specialization>,
  ) {}

  add(dto: AddSpecializationDto) {
    const specialization = this.specializationsRepository.create({
      ...dto,
      types: dto.types.map((typeId) => ({
        id: typeId,
      })),
    });

    return this.specializationsRepository.save(specialization);
  }

  delete(id: string) {
    return this.specializationsRepository.delete(id);
  }

  update(dto: UpdateSpecializationDto) {
    const specialization = this.specializationsRepository.create({
      ...dto,
      types: dto.types.map((typeId) => ({
        id: typeId,
      })),
    });

    return this.specializationsRepository.save(specialization);
  }

  getAll() {
    return this.specializationsRepository.find({
      where: {},
      relations: ['types'],
      order: { createdAt: 'DESC' },
    });
  }

  getById(id: string) {
    return this.specializationsRepository.findOne({
      where: { id },
      relations: ['types'],
    });
  }
}
