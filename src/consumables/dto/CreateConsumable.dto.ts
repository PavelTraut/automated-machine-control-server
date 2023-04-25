import { IsString } from 'class-validator';

export default class CreateConsumableDto {
  @IsString()
  name: string;

  type: string;
}
