import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import DefectType from '../entitys/defect-type';
import AddTypeDto from './dto/AddType.dto';
import UpdateTypeDto from './dto/UpdateType.dto';

@Injectable()
export class DefectTypesService {
  constructor(
    @InjectRepository(DefectType)
    private readonly defectTypesRepo: Repository<DefectType>,
  ) {}

  async add({ name }: AddTypeDto) {
    const existed = await this.defectTypesRepo.findOneBy({ name });

    if (existed) {
      if (existed.isHide) {
        await this.defectTypesRepo.update(existed.id, { isHide: false });
        return existed;
      }
      throw new BadRequestException('Тип с таким именем уже существует!');
    }

    const type = this.defectTypesRepo.create({ name });
    return this.defectTypesRepo.save(type);
  }

  private async checkNameAvalable(name: string, id?: string) {
    const existed = await this.defectTypesRepo.findOneBy({ name });
    if (existed && existed.id !== id) {
      throw new BadRequestException('Тип с таким именем уже существует!');
    }
  }

  getAll() {
    return this.defectTypesRepo.find({
      order: { createdAt: 'DESC' },
      where: { isHide: false },
    });
  }

  getById(id: string) {
    return this.defectTypesRepo.findOne({ where: { id } });
  }

  async update({ name, id }: UpdateTypeDto) {
    await this.checkNameAvalable(name, id);

    await this.defectTypesRepo.update(id, { name });
    return this.getById(id);
  }

  delete(id: string) {
    return this.defectTypesRepo.update(id, { isHide: true });
  }
}
