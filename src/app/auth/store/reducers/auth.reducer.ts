import { User, UserDetails } from "../../models/user";
import * as loginActions from "../actions";

export interface AuthState {
  user: UserDetails | undefined;
  isLoggedIn: boolean;
  isLoggingIn: boolean;
  isRegistering: boolean;
  hasError: boolean;
  error?: any;
}

const initialState: AuthState = {
  user: undefined,
  isLoggedIn: false,
  isLoggingIn: false,
  isRegistering: false,
  hasError: false,
  error: null,
};

export function reducer(
  state: AuthState = initialState,
  action: loginActions.AuthActions
): AuthState {
  switch (action.type) {
    case loginActions.LOGIN: {
      return { ...state, isLoggingIn: true };
    }
    case loginActions.LOGIN_FAIL: {
      const error = action.payload;
      return { ...state, isLoggingIn: false, hasError: true, error };
    }
    case loginActions.LOGIN_SUCCESS: {
      const user = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        isLoggingIn: false,
        hasError: false,
        error: null,
        user,
      };
    }
    case loginActions.REGISTER: {
      return { ...state, isRegistering: true, hasError: false, error: null };
    }
    case loginActions.REGISTER_FAIL: {
      const error = action.payload;
      return { ...state, isRegistering: false, hasError: true, error };
    }
    case loginActions.REGISTER_SUCCESS: {
      return { ...state, isRegistering: false, hasError: false, error: null };
    }
  }

  return state;
}

export const getIsLoggingIn = (state: AuthState) => state.isLoggingIn;
export const getIsLoggedIn = (state: AuthState) => state.isLoggedIn;
export const getUser = (state: AuthState) => state.user;
export const getHasError = (state: AuthState) => state.hasError;
export const getError = (state: AuthState) => state.error;
export const getIsRegistering = (state: AuthState) => state.isRegistering;
