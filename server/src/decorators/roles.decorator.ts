import { SetMetadata } from '@nestjs/common';
import Role from '../types/Role';

type RoleDecoratorType = Role | 'all';
const Roles = (...roles: RoleDecoratorType[]) => SetMetadata('roles', roles);

export default Roles;
