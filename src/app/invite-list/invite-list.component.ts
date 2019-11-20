import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InviteService, User } from '../service/invite.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invite-list',
  templateUrl: './invite-list.component.html',
  styleUrls: ['./invite-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InviteListComponent {
  invitedUsers: User[];
  totalInvitedUsers: number;
  constructor(private readonly inviteService: InviteService, activatedRoute: ActivatedRoute) {
    const { totalNumberOfInvites, invitedUsers } = activatedRoute.snapshot.data.invitedUserData;
    this.invitedUsers = invitedUsers;
    this.totalInvitedUsers = totalNumberOfInvites;
  }
}
