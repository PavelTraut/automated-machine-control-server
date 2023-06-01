import { IsString } from 'class-validator';

export default class UpdateConsumableDto {
  @IsString()
  name: string;

  id: string;

  number: string;
}
