import { IsBoolean, IsString, IsUUID } from 'class-validator';

export default class UpdateDefectDto {
  @IsUUID()
  id: string;
  @IsBoolean()
  isResolved: boolean;
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  consumable: string;

  responsibleId: string;

  decisionDate: Date;
}
