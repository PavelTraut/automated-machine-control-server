import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Defect from '../entitys/defect.entity';
import { Between, Repository } from 'typeorm';
import AddDefectDto from './dto/AddDefect.dto';
import UpdateDefectDto from './dto/UpdateDefect.dto';
import User from '../entitys/user.entity';
import { ConsumablesService } from '../consumables/consumables.service';
import { DefectNamesService } from '../defect-names/defect-names.service';
import { endOfDay, parse, startOfDay } from 'date-fns';

@Injectable()
export class DefectsService {
  constructor(
    @InjectRepository(Defect) private readonly defectsRepo: Repository<Defect>,
    private readonly consumablesService: ConsumablesService,
    private readonly defectNamesService: DefectNamesService,
  ) {}

  async add(addDefectDto: AddDefectDto) {
    const defectName = await this.defectNamesService.createOrFind(addDefectDto);

    const defect = this.defectsRepo.create({
      ...addDefectDto,
      responsible: addDefectDto.responsible?.map((id) => ({ id })),
      consumables: addDefectDto.consumables?.map((id) => ({ id })),
      machine: { id: addDefectDto.machineId },
      name: { id: defectName.id },
      type: { id: addDefectDto.type },
    });

    await this.consumablesService.useConsumables(addDefectDto.consumables);

    return this.defectsRepo.save(defect);
  }

  getAll({ startDate, endDate }: any) {
    return this.defectsRepo.find({
      order: {
        isResolved: { direction: 'ASC' },
        decisionDate: { direction: 'DESC' },
      },
      where: {
        createdAt:
          (!!startDate &&
            !!endDate &&
            Between(
              startOfDay(parse(startDate, 'yyyy-MM-dd', new Date())),
              endOfDay(parse(endDate, 'yyyy-MM-dd', new Date())),
            )) ||
          undefined,
      },
      relations: [
        'consumables.type',
        'responsible',
        'type',
        'name',
        'machine',
        'machine.departament',
      ],
    });
  }

  getByMachine(id: string) {
    return this.defectsRepo.find({
      where: { machine: { id } },
      order: {
        isResolved: { direction: 'ASC' },
        decisionDate: { direction: 'DESC' },
      },
      relations: [
        'consumables',
        'consumables.type',
        'responsible',
        'type',
        'name',
        'machine',
        'machine.departament',
      ],
    });
  }

  getByDepartament({ departament, startDate, endDate }: any) {
    return this.defectsRepo.find({
      where: {
        machine: {
          departament: { id: departament },
        },
        createdAt:
          (!!startDate &&
            !!endDate &&
            Between(
              startOfDay(parse(startDate, 'yyyy-MM-dd', new Date())),
              endOfDay(parse(endDate, 'yyyy-MM-dd', new Date())),
            )) ||
          undefined,
      },
      order: {
        isResolved: { direction: 'ASC' },
        decisionDate: { direction: 'DESC' },
      },
      relations: [
        'consumables',
        'consumables.type',
        'responsible',
        'type',
        'name',
        'machine',
        'machine.departament',
      ],
    });
  }

  getByUser(user: User) {
    return this.defectsRepo.find({
      where: { responsible: { id: user.id }, isResolved: false },
      relations: [
        'consumables',
        'consumables.type',
        'responsible',
        'type',
        'name',
        'machine',
        'machine.departament',
      ],
    });
  }

  getById(id: string) {
    return this.defectsRepo.findOne({
      where: { id },
      relations: [
        'consumables',
        'consumables.type',
        'responsible',
        'type',
        'machine',
        'name',
        'machine',
        'machine.departament',
      ],
    });
  }

  async update(updateDefectDto: UpdateDefectDto) {
    const defectName = await this.defectNamesService.createOrFind(
      updateDefectDto,
    );
    const original = await this.getById(updateDefectDto.id);

    await this.consumablesService.unUseConsumables(
      original.consumables.map((c) => c.id),
    );
    await this.consumablesService.useConsumables(updateDefectDto.consumables);

    return this.defectsRepo.save({
      ...updateDefectDto,
      responsible: updateDefectDto.responsible?.map((id) => ({ id })) || null,
      consumables: updateDefectDto.consumables?.map((id) => ({ id })) || null,
      name: { id: defectName.id },
      type: { id: updateDefectDto.type },
    });
  }

  delete(id: string) {
    return this.defectsRepo.delete(id);
  }

  async deleteWithCheck(id: string) {
    const original = await this.getById(id);

    await Promise.all(
      original.consumables?.map(async (c) => {
        await this.consumablesService.unUseConsumable(c.id);
      }),
    );

    return this.delete(id);
  }
}
