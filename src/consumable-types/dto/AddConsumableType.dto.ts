import { IsString } from 'class-validator';

export default class AddConsumableTypeDto {
  @IsString()
  name: string;
}
