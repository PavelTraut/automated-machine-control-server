import { IsString } from 'class-validator';

export default class AddTypeDto {
  @IsString()
  name: string;
}
