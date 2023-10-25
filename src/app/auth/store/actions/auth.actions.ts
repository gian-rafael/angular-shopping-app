import { Action } from "@ngrx/store";
import { LoginCredentials, RegistrationDetails } from "../../models/auth";
import { UserDetails } from "../../models/user";

/** Initialization */
export const AUTH_INIT = "[Auth] Init";

/** Login */
export const LOGIN = "[Auth] Login";
export const LOGIN_SUCCESS = "[Auth] Login Success";
export const LOGIN_FAIL = "[Auth] Login Fail";

/** Logout */
export const LOGOUT = "[Auth] Logout";

/** Registration */
export const REGISTER = "[Auth] Register";
export const REGISTER_SUCCESS = "[Auth] Register Success";
export const REGISTER_FAIL = "[Auth] Register Fail";

export class AuthInit implements Action {
  readonly type = AUTH_INIT;
}

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload: LoginCredentials) {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: UserDetails) {}
}

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;
  constructor(public payload: any) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class Register implements Action {
  readonly type = REGISTER;
  constructor(public payload: RegistrationDetails) {}
}

export class RegisterSuccess implements Action {
  readonly type = REGISTER_SUCCESS;
  constructor(public payload: UserDetails) {}
}

export class RegisterFail implements Action {
  readonly type = REGISTER_FAIL;
  constructor(public payload: any) {}
}

export type AuthActions =
  | AuthInit
  | Login
  | LoginSuccess
  | LoginFail
  | Logout
  | Register
  | RegisterSuccess
  | RegisterFail;
