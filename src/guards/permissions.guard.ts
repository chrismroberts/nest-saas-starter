import { CanActivate, ExecutionContext, Injectable, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ExtendedRequest } from 'src/models/extended.request';


@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    let request = context.switchToHttp().getRequest() as ExtendedRequest;
    
    let routePerms = this.reflector.get('permissions', context.getHandler())
    if (!routePerms) {
      return true
    }

    let userPermissions = request.user.permissions
    let hasPermission = routePerms.some((perm) => userPermissions.indexOf(perm) > -1)

    if (!hasPermission) {
      return false
    }

    return true
  }
}

export const Permissions = (...permissions: string[]) => SetMetadata('permissions', permissions)