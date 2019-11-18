import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, forkJoin, Observable, of, throwError, zip } from 'rxjs';
import { catchError, combineAll, concat, concatAll, map, mergeAll, zipAll } from 'rxjs/operators';
import { HttpStatusCode } from '../shared/enum';

export interface User {
  id?: number;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class InviteService {
  private readonly url = 'http://localhost:3000/users';
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
          user: user.email,
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

  _invite(users: User[]): Observable<any[]> {
    const obsArray = [];
    users.forEach(user => {
      const invite$ = this.invite(user);
      obsArray.push(invite$);
    });

    return forkJoin(obsArray);
  }
}
