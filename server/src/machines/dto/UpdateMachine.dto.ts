import { IsString, IsUUID } from 'class-validator';

export default class UpdateMachineDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  description: string;
}
