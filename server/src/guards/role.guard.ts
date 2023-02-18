import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import AppRequest from '../types/AppRequest';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request: AppRequest = context.switchToHttp().getRequest();
    return (
      (roles.includes('all') && !!request.user) ||
      roles.includes(request.user.role)
    );
  }
}
