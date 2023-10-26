import { Injectable } from "@angular/core";

import { Actions, Effect, ofType } from "@ngrx/effects";

import { of } from "rxjs";
import { switchMap, map, catchError, repeat } from "rxjs/operators";

import * as transactionActions from "../actions/transaction.action";
import { TransactionService } from "../../services/transaction.service";
import { ToastService } from "src/app/toast.service";
import { ErrorMessages } from "src/app/components/toast/toast.constants";

@Injectable({ providedIn: "root" })
export class TransactionEffect {
  constructor(
    private actions$: Actions,
    private transactionService: TransactionService,
    private toastService: ToastService
  ) {}

  @Effect()
  getTransactions$ = this.actions$.pipe(
    ofType(transactionActions.GET_TRANSACTIONS),
    switchMap(() =>
      this.transactionService.getTransasctions().pipe(
        map(
          (transactions) =>
            new transactionActions.GetTransactionsSuccess(transactions)
        ),
        catchError((error) => {
          this.toastService.showToast(ErrorMessages.customError(error.message));
          return of(new transactionActions.GetTransactionsFail(error));
        })
      )
    ),
    repeat()
  );
}
