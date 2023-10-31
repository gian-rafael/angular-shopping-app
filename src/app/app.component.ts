import { Component, OnInit } from "@angular/core";
import { AppAuthState } from "./auth/store";

import { Store, select } from "@ngrx/store";

import { Observable } from "rxjs";

import { AuthInit } from "./auth/store/actions";

import * as authSelectors from "./auth/store/selectors";
import * as authActions from "./auth/store/actions";
import { UserDetails, UserRole } from "./auth/models/user";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  userIsLoggedIn$: Observable<boolean>;
  user$: Observable<UserDetails>;

  constructor(private store: Store<AppAuthState>) {}

  ngOnInit() {
    // @ts-ignore
    $(document).ready(function () {
      // @ts-ignore
      $('[data-toggle="tooltip"]').tooltip();
    });
    this.store.dispatch(new AuthInit());
    this.userIsLoggedIn$ = this.store.pipe(select(authSelectors.getIsLoggedIn));
    this.user$ = this.store.pipe(select(authSelectors.getUser));
  }

  handleLogout() {
    this.store.dispatch(new authActions.Logout());
  }
}
