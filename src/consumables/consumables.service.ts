import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Consumable from '../entitys/consumable.entity';
import CreateConsumableDto from './dto/CreateConsumable.dto';
import UpdateConsumableDto from './dto/UpdateConsumable.dto';

@Injectable()
export class ConsumablesService {
  constructor(
    @InjectRepository(Consumable)
    private readonly consumablesRepo: Repository<Consumable>,
  ) {}

  add({ type, name, number }: CreateConsumableDto) {
    const consumable = this.consumablesRepo.create({
      name,
      number,
      type: { id: type },
    });
    return this.consumablesRepo.save(consumable);
  }

  update({ name, number, id }: UpdateConsumableDto) {
    return this.consumablesRepo.update(id, { name, number });
  }

  getUnUsed() {
    return this.consumablesRepo.find({
      where: { isAvailable: true },
      order: { createdAt: 'DESC' },
      relations: ['type'],
    });
  }

  getUsed() {
    return this.consumablesRepo.find({
      where: { isAvailable: false },
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
    return this.consumablesRepo.update(id, { isAvailable: false });
  }

  unUseConsumable(id: string) {
    return this.consumablesRepo.update(id, { isAvailable: true });
  }
}
