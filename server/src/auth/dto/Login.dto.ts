import { IsString, MinLength } from 'class-validator';

export default class LoginDto {
  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  login: string;
}
