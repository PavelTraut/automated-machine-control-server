import Role, { BranchOperatorRoles } from '../../types/Role';
import { IsEnum, IsString, IsUUID, MinLength } from 'class-validator';

export default class UpdateUserDto {
  @IsUUID()
  id: string;

  @IsEnum(BranchOperatorRoles)
  role: Role;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @MinLength(8)
  login: string;
}
