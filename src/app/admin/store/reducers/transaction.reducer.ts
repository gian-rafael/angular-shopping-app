import { Transaction } from "src/app/product/models/transaction";

import * as transactionActions from "../actions/transaction.action";

export interface TransactionState {
  transactionEntities: { [id: number]: Transaction };
  isLoaded: boolean;
  isLoading: boolean;
}

export const initialState: TransactionState = {
  transactionEntities: {},
  isLoaded: false,
  isLoading: false,
};

export function reducer(
  state: TransactionState = initialState,
  action: transactionActions.TransactionActions
): TransactionState {
  switch (action.type) {
    case transactionActions.GET_TRANSACTIONS: {
      return { ...state, isLoading: true };
    }

    case transactionActions.GET_TRANSACTIONS_SUCCESS: {
      const payload = action.payload;

      const transactionEntities = payload.reduce(
        (items, nextItem) => ({ ...items, [nextItem.id]: nextItem }),
        {}
      );

      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        transactionEntities,
      };
    }

    case transactionActions.GET_TRANSACTIONS_FAIL: {
      console.log(action.payload);
      return { ...state, isLoading: false };
    }
  }

  return state;
}

export const getTransactionEntities = (state: TransactionState) => state.transactionEntities;
export const getIsLoaded = (state: TransactionState) => state.isLoaded;
export const getIsLoading = (state: TransactionState) => state.isLoading;