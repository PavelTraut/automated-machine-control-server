import { IsString, IsUUID } from 'class-validator';

export default class AddDefectDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsUUID()
  machineId: string;
}
