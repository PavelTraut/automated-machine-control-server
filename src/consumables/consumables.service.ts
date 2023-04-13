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

  async createOrFind(name: string) {
    const existedConsumable = await this.consumablesRepo.findOneBy({ name });
    if (existedConsumable) {
      return existedConsumable;
    }
    return this.add({ name });
  }

  add(dto: CreateConsumableDto) {
    const consumable = this.consumablesRepo.create(dto);
    return this.consumablesRepo.save(consumable);
  }

  getAll() {
    return this.consumablesRepo.find();
  }
}
