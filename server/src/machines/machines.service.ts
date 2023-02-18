import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Machine from '../entitys/machine.entity';
import CreateMachineDto from './dto/CreateMachine.dto';
import UpdateMachineDto from './dto/UpdateMachine.dto';

@Injectable()
export class MachinesService {
  constructor(
    @InjectRepository(Machine)
    private readonly machinesRepository: Repository<Machine>,
  ) {}

  add(addMachineDto: CreateMachineDto) {
    const machine = this.machinesRepository.create(addMachineDto);

    return this.machinesRepository.save(machine);
  }

  getAll() {
    return this.machinesRepository.find();
  }

  getById(id: string) {
    return this.machinesRepository.findOneBy({ id });
  }

  update(updateMachineDto: UpdateMachineDto) {
    return this.machinesRepository.update(
      updateMachineDto.id,
      updateMachineDto,
    );
  }

  delete(id: string) {
    return this.machinesRepository.delete(id);
  }
}
