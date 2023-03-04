import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Defect from '../entitys/defect.entity';
import { Repository } from 'typeorm';
import AddDefectDto from './dto/AddDefect.dto';
import UpdateDefectDto from './dto/UpdateDefect.dto';
import User from '../entitys/user.entity';

@Injectable()
export class DefectsService {
  constructor(
    @InjectRepository(Defect) private readonly defectsRepo: Repository<Defect>,
  ) {}

  add(addDefectDto: AddDefectDto) {
    const defect = this.defectsRepo.create(addDefectDto);

    return this.defectsRepo.save(defect);
  }

  getAll() {
    return this.defectsRepo.find();
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

  update(updateDefectDto: UpdateDefectDto) {
    return this.defectsRepo.update(updateDefectDto.id, updateDefectDto);
  }

  delete(id: string) {
    return this.defectsRepo.delete(id);
  }
}
