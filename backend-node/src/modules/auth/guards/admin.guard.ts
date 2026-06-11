import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    const allowed = ['admin', 'super_admin'];
    if (!allowed.includes(user.role)) {
      throw new ForbiddenException('Access denied. Admin role required.');
    }


    return true;
  }
}
