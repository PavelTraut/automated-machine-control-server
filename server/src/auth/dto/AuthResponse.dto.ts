import User from '../../entitys/user.entity';

export default class AuthResponseDto {
  accessToken: string;
  user: User;
}
