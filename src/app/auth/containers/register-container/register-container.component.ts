import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Store, select } from "@ngrx/store";
import { AppAuthState } from "../../store/reducers";
import { Register } from "../../store/actions";
import { RegistrationDetails } from "../../models/auth";
import { Observable } from "rxjs";

import * as authSelectors from "../../store/selectors";

@Component({
  selector: "app-register-container",
  templateUrl: "./register-container.component.html",
  styleUrls: ["./register-container.component.css"],
})
export class RegisterContainerComponent implements OnInit {
  showPassword = false;
  showConfirmPassword = false;

  form = this.fb.group({
    username: ["", [Validators.required], []],
    password: ["", [Validators.required]],
    confirmPassword: "",
  });

  get usernameRequired() {
    const control = this.form.get("username");
    return control.hasError("required") && control.touched;
  }

  get passwordRequired() {
    const control = this.form.get("password");
    return control.hasError("required") && control.touched;
  }

  get confirmPasswordRequired() {
    const control = this.form.get("confirmPassword");
    return control.hasError("required") && control.touched;
  }

  get passwordMismatch() {
    const control = this.form.get("confirmPassword");
    return control.hasError("passwordMismatch") && control.touched;
  }

  isRegistering$: Observable<boolean>;
  hasError$: Observable<boolean>;
  errors$: Observable<any>;

  constructor(private fb: FormBuilder, private store: Store<AppAuthState>) {}

  register() {
    const { confirmPassword, ...details } = this.form.value;
    const registrationDetails: RegistrationDetails = {
      ...details,
      role: "user",
    };
    this.store.dispatch(new Register(registrationDetails));
  }

  ngOnInit() {
    this.form
      .get("confirmPassword")
      .setValidators([
        Validators.required,
        this.passwordMismatchValidator(this.form),
      ]);
    this.form.get("password").valueChanges.subscribe(() => {
      this.form.get("confirmPassword").updateValueAndValidity();
    });

    this.isRegistering$ = this.store.pipe(
      select(authSelectors.getIsRegistering)
    );
    this.hasError$ = this.store.pipe(select(authSelectors.getHasError));
    this.errors$ = this.store.pipe(select(authSelectors.getErrors));
  }

  passwordMismatchValidator(form: FormGroup) {
    return () => {
      const password = form.get("password");
      const confirm = form.get("confirmPassword");

      if (password.value === confirm.value) {
        return null;
      }

      return { passwordMismatch: true };
    };
  }

  toggleShowPassword(value: boolean) {
    this.showPassword = value;
  }

  toggleShowConfirmPassword(value: boolean) {
    this.showConfirmPassword = value;
  }
}
