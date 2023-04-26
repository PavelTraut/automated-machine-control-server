import { IsString, IsUUID } from 'class-validator';
import User from '../../entitys/user.entity';

export default class AddDefectDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  machineId: string;

  @IsUUID()
  consumable: string;

  responsible: User[];

  decisionDate: Date;

  type: string;
}
