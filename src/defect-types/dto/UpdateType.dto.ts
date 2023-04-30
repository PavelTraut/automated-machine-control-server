import { IsString, IsUUID } from 'class-validator';

export default class UpdateTypeDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;
}
