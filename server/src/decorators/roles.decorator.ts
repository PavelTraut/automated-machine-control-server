import { SetMetadata } from '@nestjs/common';
import Role from '../types/Role';

const Roles = (...roles: Role[]) => SetMetadata('roles', roles);

export default Roles;
