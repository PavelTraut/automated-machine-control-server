import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import AddConsumableTypeDto from './dto/AddConsumableType.dto';
import UpdateConsumbleTypeDto from './dto/UpdateConsumbleType.dto';
import ConsumableType from '../entitys/consumable-type.entity';

@Injectable()
export class ConsumableTypesService {
  constructor(
    @InjectRepository(ConsumableType)
    private readonly consumableTypesRepo: Repository<ConsumableType>,
  ) {}

  async add({ name }: AddConsumableTypeDto) {
    const existedType = await this.consumableTypesRepo.findOneBy({ name });

    if (existedType) {
      throw new BadRequestException('Такой тип уже существует');
    }

    const type = this.consumableTypesRepo.create({ name });

    return this.consumableTypesRepo.save(type);
  }
  update(dto: UpdateConsumbleTypeDto) {
    return this.consumableTypesRepo.update(dto.id, { name: dto.name });
  }

  getAll() {
    return this.consumableTypesRepo.find({
      relations: ['consumables'],
      order: { createdAt: 'DESC' },
    });
  }

  getById(id: string) {
    return this.consumableTypesRepo.findOne({
      where: { id },
      relations: ['consumables'],
    });
  }

  delete(id: string) {
    return this.consumableTypesRepo.delete(id);
  }
}
