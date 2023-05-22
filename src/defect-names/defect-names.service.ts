import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import DefectName from '../entitys/defect-name.entity';
import AddNameDto from './dto/AddName.dto';

@Injectable()
export class DefectNamesService {
  constructor(
    @InjectRepository(DefectName)
    private readonly defectNamesRepo: Repository<DefectName>,
  ) {}

  async add({ name }: AddNameDto) {
    const type = this.defectNamesRepo.create({ name });
    return this.defectNamesRepo.save(type);
  }

  async createOrFind({ name }: AddNameDto) {
    const existed = await this.getByName(name);
    if (existed) {
      return existed;
    }

    return this.add({ name });
  }

  async getByName(name: string) {
    return this.defectNamesRepo.findOneBy({ name });
  }

  getAll(name = '') {
    return this.defectNamesRepo.find({
      where: { name: Like(`%${name}%`) },
      order: { createdAt: 'DESC' },
    });
  }
}
