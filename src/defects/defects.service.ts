import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Defect from '../entitys/defect.entity';
import { Repository } from 'typeorm';
import AddDefectDto from './dto/AddDefect.dto';
import UpdateDefectDto from './dto/UpdateDefect.dto';
import User from '../entitys/user.entity';
import { ConsumablesService } from '../consumables/consumables.service';

@Injectable()
export class DefectsService {
  constructor(
    @InjectRepository(Defect) private readonly defectsRepo: Repository<Defect>,
    private readonly consumablesService: ConsumablesService,
  ) {}

  async add(addDefectDto: AddDefectDto) {
    const consumable = await this.consumablesService.createOrFind(
      addDefectDto.consumable,
    );
    const defect = this.defectsRepo.create({
      ...addDefectDto,
      consumable,
      responsible: { id: addDefectDto.responsibleId },
      machine: { id: addDefectDto.machineId },
    });

    return this.defectsRepo.save({ ...defect });
  }

  getAll() {
    return this.defectsRepo.find();
  }

  getByMachine(id: string) {
    return this.defectsRepo.find({ where: { machine: { id } } });
  }

  getByUser(user: User) {
    return this.defectsRepo.find({
      where: { machine: { departament: { id: user.departament.id } } },
      relations: ['machine'],
    });
  }

  getById(id: string) {
    return this.defectsRepo.findOneBy({ id });
  }

  async update(updateDefectDto: UpdateDefectDto) {
    const consumable = await this.consumablesService.createOrFind(
      updateDefectDto.name,
    );

    return this.defectsRepo.update(updateDefectDto.id, {
      ...updateDefectDto,
      responsible: { id: updateDefectDto.responsibleId },
      consumable,
    });
  }

  delete(id: string) {
    return this.defectsRepo.delete(id);
  }
}
