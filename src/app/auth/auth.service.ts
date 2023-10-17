import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, throwError, from, of, iif } from "rxjs";
import { catchError, tap, take, switchMap } from "rxjs/operators";

import { LoginCredentials, RegistrationDetails } from "./models/auth";
import { User } from "./models/user";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly AUTH_ENDPOINT = "http://localhost:3000/users";

  constructor(private http: HttpClient) {}

  login(
    loginCredentials: LoginCredentials
  ): Observable<User | undefined | null> {
    return this.http
      .get<User[]>(
        `${this.AUTH_ENDPOINT}?username=${loginCredentials.username}`
      )
      .pipe(
        switchMap((users) =>
          iif(
            () => users.length > 0,
            from(users).pipe(
              take(1),
              switchMap((user) => {
                if (user && user.password === loginCredentials.password) {
                  if (loginCredentials.rememberUser) {
                    this.persistUserSession(user);
                  }
                  return of(user);
                }
                return of(null);
              })
            ),
            of(null)
          )
        )
      );
  }

  register(
    registrationDetails: RegistrationDetails
  ): Observable<User | null | undefined> {
    return this.http
      .get<User[]>(
        `${this.AUTH_ENDPOINT}?username=${registrationDetails.username}`
      )
      .pipe(
        switchMap((users) =>
          iif(
            () => users.length > 0,
            of(null),
            this.http.post<User>(this.AUTH_ENDPOINT, registrationDetails)
          )
        )
      );
  }

  private persistUserSession(user: User) {
    const { password, ...userDetails } = user;
    localStorage.setItem("session", JSON.stringify(userDetails));
  }
}
