import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";

import { AuthState, reducer as authReducer } from "./auth.reducer";

export interface AppAuthState {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppAuthState> = {
  auth: authReducer,
};

export const getAuthState = createFeatureSelector<AppAuthState>("auth");

export * from "./auth.reducer";
