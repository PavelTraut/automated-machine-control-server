import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Consumable from '../entitys/consumable.entity';
import CreateConsumableDto from './dto/CreateConsumable.dto';

@Injectable()
export class ConsumablesService {
  constructor(
    @InjectRepository(Consumable)
    private readonly consumablesRepo: Repository<Consumable>,
  ) {}

  add({ type, name }: CreateConsumableDto) {
    const consumable = this.consumablesRepo.create({
      name,
      type: { id: type },
    });
    return this.consumablesRepo.save(consumable);
  }

  getAll() {
    return this.consumablesRepo.find({
      order: { createdAt: 'DESC' },
      relations: ['type'],
    });
  }

  getById(id) {
    return this.consumablesRepo.findOne({ where: { id }, relations: ['type'] });
  }

  delete(id: string) {
    return this.consumablesRepo.delete(id);
  }

  useConsumable(id: string) {
    return this.consumablesRepo.update(id, { isUsed: true });
  }
}
