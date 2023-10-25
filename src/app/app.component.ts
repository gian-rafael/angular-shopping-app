import { Component, OnInit } from "@angular/core";
import { AppAuthState } from "./auth/store";

import { Store, select } from "@ngrx/store";

import { Observable } from "rxjs";

import { AuthInit } from "./auth/store/actions";

import * as authSelectors from "./auth/store/selectors";
import * as authActions from "./auth/store/actions";
import { UserRole } from "./auth/models/user";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  userIsLoggedIn$: Observable<boolean>;
  userRole$: Observable<UserRole>;

  constructor(private store: Store<AppAuthState>) {}

  ngOnInit() {
    // @ts-ignore
    $(document).ready(function () {
      // @ts-ignore
      $('[data-toggle="tooltip"]').tooltip();
    });
    this.store.dispatch(new AuthInit());
    this.userIsLoggedIn$ = this.store.pipe(select(authSelectors.getIsLoggedIn));
    this.userRole$ = this.store.pipe(select(authSelectors.getUserRole));
  }

  handleLogout() {
    this.store.dispatch(new authActions.Logout());
  }
}
