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
      responsible: addDefectDto.responsible.map((id) => ({ id })),
      consumables: addDefectDto.consumables.map((id) => ({ id })),
      machine: { id: addDefectDto.machineId },
      type: { id: addDefectDto.type },
    });

    await Promise.all(
      addDefectDto.consumables.map(async (c) => {
        await this.consumablesService.useConsumable(c);
      }),
    );

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
      relations: ['consumables', 'responsible', 'type'],
    });
  }

  getByUser(user: User) {
    return this.defectsRepo.find({
      where: { machine: { departament: { id: user.departament.id } } },
      relations: ['consumables', 'responsible', 'type'],
    });
  }

  getById(id: string) {
    return this.defectsRepo.findOne({
      where: { id },
      relations: ['consumables', 'responsible', 'type', 'machine'],
    });
  }

  async update(updateDefectDto: UpdateDefectDto) {
    const original = await this.getById(updateDefectDto.id);
    await Promise.all(
      original.consumables.map(async (c) => {
        await this.consumablesService.unUseConsumable(c.id);
      }),
    );

    await this.delete(original.id);
    return this.add({
      ...original,
      consumables: original?.consumables.map((c) => c.id),
      responsible: original?.responsible.map((c) => c.id),
      ...updateDefectDto,
      machineId: original.machine.id,
    });
  }

  delete(id: string) {
    return this.defectsRepo.delete(id);
  }

  async deleteWithCheck(id: string) {
    const original = await this.getById(id);

    await Promise.all(
      original.consumables.map(async (c) => {
        await this.consumablesService.unUseConsumable(c.id);
      }),
    );

    return this.delete(id);
  }
}
