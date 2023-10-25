import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";

import { withLatestFrom, map } from "rxjs/operators";

import { Store, select } from "@ngrx/store";

import { AuthState } from "../store";
import { getIsLoggedIn, getIsLoggingIn } from "../store/selectors";

@Injectable({
  providedIn: "root",
})
export class UserLoggedInGuard implements CanActivate {
  constructor(private store: Store<AuthState>) {}

  canActivate() {
    return this.isLoggedIn().pipe(
      withLatestFrom(this.isLoggingIn()),
      map(([isLoggedIn, isLoggingIn]) => isLoggingIn || isLoggedIn)
    );
  }

  isLoggedIn() {
    return this.store.pipe(select(getIsLoggedIn));
  }

  isLoggingIn() {
    return this.store.pipe(select(getIsLoggingIn));
  }
}
