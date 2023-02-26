import { IsString, IsUUID } from 'class-validator';

export default class UpdateDepartamentDto {
  @IsString()
  name: string;

  @IsString()
  id: string;
}
