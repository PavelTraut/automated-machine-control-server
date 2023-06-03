import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import AppRequest from '../types/AppRequest';
import getUserLevelByRole from '../utils/getUserLevelByRole';
import Role from '../types/Role';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
  const roles: Role[] = this.reflector.get<Role[]>(
       'roles',
       context.getHandler(),
     );
     if (!roles) {
      return true;
     }
     const rolesLevels = roles.map((r) => getUserLevelByRole(r));
     const request: AppRequest = context.switchToHttp().getRequest();
    return (
       request.user &&
     (!!(rolesLevels.includes(-1) && request.user?.role) ||
        Math.max(...rolesLevels) >= getUserLevelByRole(request.user?.role))
    );
  }
}
