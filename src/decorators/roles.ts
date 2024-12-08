import { SetMetadata } from '@nestjs/common';

/**
 * Custom decorator to define roles for a route.
 * @param roles - List of roles allowed to access the route.
 */
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
