import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InviteService, User } from '../service/invite.service';
import { Router } from '@angular/router';
import { AutoUnsubscribe } from '../shared/decorators';
import { single, tap, throttleTime } from 'rxjs/operators';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@AutoUnsubscribe()
export class InviteComponent {
  constructor(private readonly inviteService: InviteService, private readonly router: Router) {}
  submitDisabled = false;
  private readonly throttleTime = 1000;
  onSubmit(): void {
    this.submitDisabled = true;
    this.inviteService
      .invite(users)
      .pipe(
        single(),
        throttleTime(this.throttleTime),
      )
      .subscribe(() => {
        this.submitDisabled = false;
        this.router.navigate(['/list']);
      });
  }
}
