import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";

import { Store, select } from "@ngrx/store";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { AppAuthState } from "../store";
import { getIsLoggedIn } from "../store/selectors";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppAuthState>) {}
  canActivate() {
    return this.isNotLoggedIn();
  }

  isNotLoggedIn(): Observable<boolean> {
    return this.store.pipe(
      select(getIsLoggedIn),
      map((val) => !val)
    );
  }
}
