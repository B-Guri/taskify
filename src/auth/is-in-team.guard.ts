import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

export class IsInTeamGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    console.log(req);
    const team = req.user.teams.find(
      (teams) => teams.team.id === req.params.teamId,
    );

    if (!team) return false;

    return true;
  }
}
