import { Injectable } from "@angular/core";

import { Actions, Effect, ofType } from "@ngrx/effects";

import { of } from "rxjs";
import { map, switchMap, catchError, filter, tap } from "rxjs/operators";

import * as authActions from "../actions/auth.actions";

import { AuthService } from "../../auth.service";
import { UserDetails } from "../../models/user";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  @Effect()
  init$ = this.actions$.pipe(
    ofType(authActions.AUTH_INIT),
    map(() => {
      const user = this.checkUserFromLocalStorage();
      if (user) {
        return new authActions.LoginSuccess(user);
      } else {
        return new authActions.LoginFail(null);
      }
    }),
    filter((action) => !!action)
  );

  @Effect()
  login$ = this.actions$.pipe(
    ofType(authActions.LOGIN),
    map((action: authActions.Login) => action.payload),
    switchMap((loginCredentials) => this.authService.login(loginCredentials)),
    map((user) => {
      if (user) {
        let { password, ...details } = user;
        if (details.role === "admin") {
          this.router.navigate(["inventory"]);
        } else {
          this.router.navigate(["/"]);
        }
        return new authActions.LoginSuccess(details);
      } else {
        return new authActions.LoginFail("Invalid Login Credentials");
      }
    }),
    catchError(() => of(new authActions.LoginFail("An Error Has Occured")))
  );

  @Effect()
  register$ = this.actions$.pipe(
    ofType(authActions.REGISTER),
    switchMap((action: authActions.Register) =>
      this.authService.register(action.payload)
    ),
    map((user) => {
      if (user) {
        const { password, ...details } = user;
        return new authActions.LoginSuccess(details);
      } else {
        return new authActions.RegisterFail("Username is already taken.");
      }
    })
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType(authActions.LOGOUT),
    tap(() => {
      this.clearUserSession();
      this.router.navigate(["/"]);
    })
  );

  private checkUserFromLocalStorage(): UserDetails {
    const userJson = localStorage.getItem("session");
    if (userJson) {
      return JSON.parse(userJson);
    } else {
      return null;
    }
  }

  private clearUserSession(): void {
    localStorage.removeItem("session");
  }
}
