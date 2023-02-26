import { IsString } from 'class-validator';

export default class AddDepartamentDto {
  @IsString()
  name: string;
}
