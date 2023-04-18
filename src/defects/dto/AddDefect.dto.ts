import { IsString } from 'class-validator';

export default class AddDefectDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  machineId: string;

  @IsString()
  consumable: string;

  responsibleId: string;

  decisionDate: Date;

  type: string;
}
