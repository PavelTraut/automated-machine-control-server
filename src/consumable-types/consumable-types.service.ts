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
    const existedType = await this.findByName(name);

    if (existedType) {
      throw new BadRequestException('Такой тип уже существует');
    }

    const type = this.consumableTypesRepo.create({ name });

    return this.consumableTypesRepo.save(type);
  }

  async update(dto: UpdateConsumbleTypeDto) {
    const existedType = await this.findByName(dto.name);
    if (existedType && existedType.id != dto.id) {
      throw new BadRequestException('Такой тип уже существует');
    }
    await this.consumableTypesRepo.update(dto.id, { name: dto.name });
    return this.getById(dto.id);
  }

  getAll() {
    return this.consumableTypesRepo.find({
      relations: ['consumables'],
      where: { isHide: false },
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
    return this.consumableTypesRepo.update(id, { isHide: true });
  }

  findByName(name: string) {
    return this.consumableTypesRepo.findOneBy({
      name,
      isHide: false,
    });
  }
}
