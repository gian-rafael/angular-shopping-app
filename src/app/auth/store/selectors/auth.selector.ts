import { createSelector } from "@ngrx/store";

import * as fromReducer from "../reducers";

export const getAuthState = createSelector(
  fromReducer.getAuthState,
  (state) => state.auth
);

export const getIsLoggingIn = createSelector(getAuthState, fromReducer.getIsLoggingIn);
export const getIsLoggedIn = createSelector(getAuthState, fromReducer.getIsLoggedIn);
export const getHasError = createSelector(getAuthState, fromReducer.getHasError);
export const getErrors = createSelector(getAuthState, fromReducer.getError);
export const getIsRegistering = createSelector(getAuthState, fromReducer.getIsRegistering);
export const getUser = createSelector(getAuthState, fromReducer.getUser);
export const getUserRole = createSelector(getUser, getIsLoggedIn, (user, isLoggedIn) => {
  if (isLoggedIn) {
    return user.role;
  }
  return "user";
});