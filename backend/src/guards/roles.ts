import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/decorators/roles.enum';
import { ROLES_KEY } from 'src/decorators/roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    console.log('RolesGuard Check:', {
      requiredRoles,
      userRole: user?.role,
      user: user,
    });

    if (!user || !user.role) {
      console.error('No user or role found:', user);
      return false;
    }

    return requiredRoles.some((role) => user.role === role);
  }
}
