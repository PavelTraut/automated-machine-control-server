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
    const defect = this.defectsRepo.create({
      ...addDefectDto,
      consumable: { id: addDefectDto.consumable },
      responsible: { id: addDefectDto.responsibleId },
      machine: { id: addDefectDto.machineId },
    });

    await this.consumablesService.useConsumable(addDefectDto.consumable);

    return this.defectsRepo.save(defect);
  }

  getAll() {
    return this.defectsRepo.find();
  }

  getByMachine(id: string) {
    return this.defectsRepo.find({
      where: { machine: { id } },
      order: {
        isResolved: { direction: 'ASC' },
        decisionDate: { direction: 'DESC' },
      },
      relations: ['consumable', 'responsible'],
    });
  }

  getByUser(user: User) {
    return this.defectsRepo.find({
      where: { machine: { departament: { id: user.departament.id } } },
      relations: ['consumable', 'responsible'],
    });
  }

  getById(id: string) {
    return this.defectsRepo.findOne({
      where: { id },
      relations: ['consumable', 'responsible'],
    });
  }

  async update(updateDefectDto: UpdateDefectDto) {
    await this.defectsRepo.update(updateDefectDto.id, {
      ...updateDefectDto,
    });
    return this.getById(updateDefectDto.id);
  }

  delete(id: string) {
    return this.defectsRepo.delete(id);
  }
}
