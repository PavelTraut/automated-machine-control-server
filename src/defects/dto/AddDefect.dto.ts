import { IsString, IsUUID } from 'class-validator';
import User from '../../entitys/user.entity';
import Consumable from '../../entitys/consumable.entity';

export default class AddDefectDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  machineId: string;

  consumables: string[];

  responsible: string[];

  decisionDate: Date;

  @IsUUID()
  type: string;
}
