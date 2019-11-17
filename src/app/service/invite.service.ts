import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, forkJoin, Observable, of, throwError, zip } from 'rxjs';
import {
  catchError,
  combineAll,
  concat,
  concatAll,
  mergeAll,
  zipAll,
} from 'rxjs/operators';

export interface User {
  id?: number;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class InviteService {
  private readonly url = 'http://localhost:3000/users';
  private _errors = [];
  private _users = [];
  constructor(private http: HttpClient) {}

  get(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  invite(user: User) {
    return this.http.post<User>(this.url, user).pipe(
      catchError(err => {
        const error = {
          user,
          err,
          isError: true,
        };
        return of(error);
      }),
    );
  }

  _invite(users: User[]): Observable<any[]> {
    const obsArray = [];
    users.forEach(user => {
      const invite$ = this.invite(user);
      obsArray.push(invite$);
    });

    // console.log(obsArray);
    return forkJoin(obsArray);
  }
}
