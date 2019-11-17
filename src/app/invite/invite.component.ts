import { Component, OnInit } from '@angular/core';
import { InviteService, User } from '../service/invite.service';
import {Router} from '@angular/router';

const users: User[] = [
  { email: 'user0@comtravo.com' },
  { email: 'user1@comtravo.com' },
  { email: 'user2@comtravo.com' },
  { email: 'user3@comtravo.com' },
  { email: 'user4@comtravo.com' },
  { email: 'user5@comtravo.com' },
  { email: 'user6@comtravo.com' },
  { email: 'user7@comtravo.com' },
  { email: 'user8@comtravo.com' },
  { email: 'user9@comtravo.com' },
  { email: 'user10@comtravo.com' },
];

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css'],
})
// @AutoUnsubscribe()
export class InviteComponent implements OnInit {
  constructor(private readonly inviteService: InviteService, private readonly router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.inviteService
      ._invite(users)
      .subscribe(res => res.forEach(res2 => {
        console.log(res2);
        this.router.navigate(['/list']);
      }));
  }
}
