import { IsString } from 'class-validator';

export default class CreateMachineDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  departamentId: string;

  model: string;

  number: string;

  startYear: string;
}
