import { IsString, IsUUID } from 'class-validator';

export default class UpdateConsumbleTypeDto {
  @IsString()
  name: string;

  @IsUUID()
  id: string;
}
