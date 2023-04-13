import Role, { BranchOperatorRoles } from '../../types/Role';
import { IsEnum, IsString, MinLength } from 'class-validator';

export default class AddUserDto {
  @IsEnum(BranchOperatorRoles)
  role: Role;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  login: string;

  departamentId:string
}
