import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Machine from '../entitys/machine.entity';
import CreateMachineDto from './dto/CreateMachine.dto';
import UpdateMachineDto from './dto/UpdateMachine.dto';
import User from '../entitys/user.entity';

@Injectable()
export class MachinesService {
  constructor(
    @InjectRepository(Machine)
    private readonly machinesRepository: Repository<Machine>,
  ) {}

  add(addMachineDto: CreateMachineDto) {
    const machine = this.machinesRepository.create({
      ...addMachineDto,
      departament: { id: addMachineDto.departamentId },
    });

    return this.machinesRepository.save(machine);
  }

  getAll() {
    return this.machinesRepository.find({ relations: ['departament'] });
  }

  getByUser(user: User) {
    return this.machinesRepository.find({
      where: { departament: { id: user.departament.id } },
      relations: ['departament','defects'],
    });
  }

  getById(id: string) {
    return this.machinesRepository.findOneBy({ id });
  }

  async update(updateMachineDto: UpdateMachineDto) {
    await this.machinesRepository.save(updateMachineDto);

    return updateMachineDto;
  }

  delete(id: string) {
    return this.machinesRepository.delete(id);
  }
}
