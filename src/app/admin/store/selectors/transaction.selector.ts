import { createSelector } from "@ngrx/store";

import { getAdminState } from '../reducers';
import * as fromReducer from '../reducers/transaction.reducer';

export const getTransactionState = createSelector(getAdminState, (state) => state.transactions);

export const getTransactionEntities = createSelector(getTransactionState, fromReducer.getTransactionEntities);
export const getTransactionlist = createSelector(getTransactionEntities, (transactions) => Object.values(transactions));
export const getIsLoaded = createSelector(getTransactionState, fromReducer.getIsLoaded);
export const getIsLoading = createSelector(getTransactionState, fromReducer.getIsLoading);