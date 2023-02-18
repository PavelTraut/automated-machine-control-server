import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Defect from '../entitys/defect.entity';
import { Repository } from 'typeorm';
import AddDefectDto from './dto/AddDefect.dto';
import UpdateDefectDto from './dto/UpdateDefect.dto';

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
