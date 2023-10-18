import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

import { Store, select } from "@ngrx/store";

import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

import { AppAuthState } from "../store";
import { getIsLoggedIn } from "../store/selectors";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppAuthState>, private router: Router) {}
  canActivate() {
    return this.isNotLoggedIn().pipe(
      tap((loggedIn) => {
        if (!loggedIn) this.router.navigate(["/"]);
      })
    );
  }

  isNotLoggedIn(): Observable<boolean> {
    return this.store.pipe(
      select(getIsLoggedIn),
      map((val) => !val)
    );
  }
}
