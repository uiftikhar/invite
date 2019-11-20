import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpStatusCode } from '../shared/enum';

export interface User {
  id?: number;
  email: string;
  error?: string;
  isError?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class InviteService {
  private readonly url = 'http://localhost:3000/users';
  private readonly invitedUsers: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  constructor(private readonly http: HttpClient) {}

  get(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  invite(user: User) {
    return this.http.post<User>(this.url, user).pipe(
      map(res => ({ ...res, isError: false })),
      catchError(err => {
        const errorMessage = this._generateErrorMessage(err.status);
        return of({
          error: `${err.statusText}: ${errorMessage}`,
          isError: true,
          email: user.email,
        });
      }),
    );
  }

  _generateErrorMessage(errorStatus: number) {
    let errorMessage = '';
    switch (errorStatus) {
      case HttpStatusCode.Conflict:
        errorMessage = 'user already exists.';
        break;
      case HttpStatusCode.Internal_Server_Error:
        errorMessage = 'something went wrong. please try again';
        break;
      default:
        errorMessage = 'unknown error. Please try again';
        break;
    }
    return errorMessage;
  }

  getInvitedUsers() {
    return {
      invitedUsers: this.invitedUsers.getValue(),
      totalNumberOfInvites: this.invitedUsers.getValue().filter(user => !user.isError).length,
    };
  }

  _invite(users: User[]) {
    const obsArray = [];
    users.forEach(user => {
      const invite$ = this.invite(user);
      obsArray.push(invite$);
    });

    return forkJoin(obsArray).pipe(tap((res: User[]) => this.invitedUsers.next(res)));
  }
}
