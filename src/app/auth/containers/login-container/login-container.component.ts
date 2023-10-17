import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Store, select } from "@ngrx/store";

import { Observable } from "rxjs";

import { AppAuthState } from "../../store";
import { Login } from "../../store/actions";
import * as selectors from "../../store/selectors";

@Component({
  selector: "app-login-container",
  templateUrl: "./login-container.component.html",
  styleUrls: ["./login-container.component.scss"],
})
export class LoginContainerComponent implements OnInit {
  showPassword = false;

  form = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required],
    rememberUser: false,
  });

  get usernameRequired() {
    const control = this.form.get("username");
    return control.hasError("required") && control.touched;
  }

  get passwordRequired() {
    const control = this.form.get("password");
    return control.hasError("required") && control.touched;
  }

  isLoggingIn$: Observable<boolean>;
  hasError$: Observable<boolean>;
  errors$: Observable<any>;

  constructor(private fb: FormBuilder, private store: Store<AppAuthState>) {}

  ngOnInit() {
    this.isLoggingIn$ = this.store.pipe(select(selectors.getIsLoggingIn));
    this.hasError$ = this.store.pipe(select(selectors.getHasError));
    this.errors$ = this.store.pipe(select(selectors.getErrors));
  }

  login() {
    console.log(this.form.value);
    this.store.dispatch(new Login(this.form.value));
  }

  toggleShowPassword(value: boolean) {
    this.showPassword = value;
  }
}
