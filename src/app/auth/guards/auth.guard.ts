import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

import { Store, select } from "@ngrx/store";

import { map } from "rxjs/operators";

import { AppAuthState } from "../store";
import { getIsLoggedIn } from "../store/selectors";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppAuthState>, private router: Router) {}
  canActivate() {
    return this.isLoggedIn().pipe(
      map((val) => {
        if (val) {
          this.router.navigate(["/"]);
          return true;
        } else {
          return !val;
        }
      })
    );
  }

  isLoggedIn() {
    return this.store.pipe(select(getIsLoggedIn));
  }
}
