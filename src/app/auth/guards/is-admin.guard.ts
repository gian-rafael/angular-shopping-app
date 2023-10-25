import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Store, select } from "@ngrx/store";

import { map } from "rxjs/operators";

import { AppAuthState } from "../store";
import * as authSelectors from "../store/selectors/auth.selector";

@Injectable({
  providedIn: "root",
})
export class IsAdminGuard implements CanActivate {
  constructor(private store: Store<AppAuthState>, private router: Router) {}

  canActivate() {
    return this.isAdmin().pipe(
      map((isAdmin) => {
        if (!isAdmin) {
          this.router.navigate(["/"]);
        }
        return isAdmin;
      })
    );
  }

  isAdmin() {
    return this.store.pipe(
      select(authSelectors.getUserRole),
      map((role) => role === "admin")
    );
  }
}
