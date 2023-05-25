import { IsUUID } from 'class-validator';

export default class RegeneratePassDto {
  @IsUUID()
  userId: string;
}
