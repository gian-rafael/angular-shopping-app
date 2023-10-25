import { Action } from "@ngrx/store";
import { Transaction } from "src/app/product/models/transaction";

export const GET_TRANSACTIONS = "[Transaction] Get transactions";
export const GET_TRANSACTIONS_SUCCESS =
  "[Transaction] Get transactions success";
export const GET_TRANSACTIONS_FAIL = "[Transaction] Get transactions fail";

export class GetTransactions implements Action {
  readonly type = GET_TRANSACTIONS;
}

export class GetTransactionsSuccess implements Action {
  readonly type = GET_TRANSACTIONS_SUCCESS;
  constructor(public payload: Transaction[]) {}
}

export class GetTransactionsFail implements Action {
  readonly type = GET_TRANSACTIONS_FAIL;
  constructor(public payload: any) {}
}

export type TransactionActions =
  | GetTransactions
  | GetTransactionsSuccess
  | GetTransactionsFail;
