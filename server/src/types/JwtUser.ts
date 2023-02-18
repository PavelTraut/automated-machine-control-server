import Role from './Role';

export default interface JwtUser {
  role: Role;
  id: string;
}
