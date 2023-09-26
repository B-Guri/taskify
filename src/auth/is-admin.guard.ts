import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserTeamRole } from 'src/user/user-team-role.enum';

export class IsAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const team = req.user.teams.find(
      (teams) => teams.team.id === req.body.teamId,
    );

    if (!team || !(team.role === UserTeamRole.ADMIN)) return false;

    return true;
  }
}
