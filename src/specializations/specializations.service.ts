import { BadRequestException, Injectable } from '@nestjs/common';
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

  async add(dto: AddSpecializationDto) {
    const existed = await this.findByName(dto.name);

    if (existed) {
      if (existed.isHide) {
        await this.specializationsRepository.update(existed.id, {
          isHide: false,
        });
        return existed;
      }

      this.throwNameBlockExeption();
    }

    const specialization = this.specializationsRepository.create({
      ...dto,
      types: dto.types.map((typeId) => ({
        id: typeId,
      })),
    });

    const saved = await this.specializationsRepository.save(specialization);

    return this.getById(saved.id);
  }

  delete(id: string) {
    return this.specializationsRepository.update(id, { isHide: true });
  }

  async update(dto: UpdateSpecializationDto) {
    const existed = await this.findByName(dto.name);

    if (existed && existed.id != dto.id) {
      this.throwNameBlockExeption();
    }

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
      where: { isHide: false },
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

  private findByName(name: string) {
    return this.specializationsRepository.findOne({
      where: { name, isHide: false },
      relations: ['types'],
    });
  }

  throwNameBlockExeption() {
    throw new BadRequestException(
      'Специальность с таким именем уже существует',
    );
  }
}
