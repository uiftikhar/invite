import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InviteService, User } from '../service/invite.service';

@Component({
  selector: 'app-invite-list',
  templateUrl: './invite-list.component.html',
  styleUrls: ['./invite-list.component.css']
})
export class InviteListComponent {
  users$: Observable<User[]>;

  constructor(private readonly inviteService: InviteService) {
    this.users$ = this.inviteService.get();
  }
}
