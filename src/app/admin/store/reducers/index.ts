import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";

import { TransactionState } from "./transaction.reducer";

import * as fromTransactionReducer from "./transaction.reducer";

interface AdminState {
  transactions: TransactionState;
}

export const reducers: ActionReducerMap<AdminState> = {
  transactions: fromTransactionReducer.reducer,
};

export const getAdminState = createFeatureSelector<AdminState>("admin");
