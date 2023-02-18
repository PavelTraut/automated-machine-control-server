import { IsString, IsUUID } from 'class-validator';

export default class UpdateMachineDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsString()
  description: string;
}
