import { Component, OnInit } from "@angular/core";
import { AppAuthState } from "./auth/store";

import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

import * as authSelectors from "./auth/store/selectors";
import { AuthInit } from "./auth/store/actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  userIsLoggedIn$: Observable<boolean>;

  constructor(private store: Store<AppAuthState>) {}

  ngOnInit() {
    this.store.dispatch(new AuthInit());
    this.userIsLoggedIn$ = this.store.pipe(select(authSelectors.getIsLoggedIn));
  }
}
