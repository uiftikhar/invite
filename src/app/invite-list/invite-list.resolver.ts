import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { InviteService, User } from '../service/invite.service';

@Injectable()
export class InviteListResolve
  implements
    Resolve<{
      invitedUsers: User[];
      totalNumberOfInvites: number;
    }> {
  constructor(private readonly inviteService: InviteService) {}
  resolve(
    route: ActivatedRouteSnapshot,
  ): {
    invitedUsers: User[];
    totalNumberOfInvites: number;
  } {
    return this.inviteService.getInvitedUsers();
  }
}
