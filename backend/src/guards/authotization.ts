import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/decorators/roles.enum';
import { ROLES_KEY } from 'src/decorators/roles';

@Injectable()
export class authorizationGaurd implements CanActivate {
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
    if (!user) throw new UnauthorizedException('no user attached');
    const userRole = user.role;
    if (!requiredRoles.includes(userRole))
      throw new UnauthorizedException('unauthorized access');

    return true;
  }
}
