import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";

import { Store, select } from "@ngrx/store";

import { of } from "rxjs";
import {
  tap,
  take,
  switchMap,
  catchError,
  filter,
  withLatestFrom,
} from "rxjs/operators";

import { ProductState } from "../../product/store/reducers/product.reducer";
import * as productSelectors from "../../product/store/selectors/product.selector";
import * as productActions from "../../product/store/actions/product.action";

import { TransactionState } from "../store/reducers/transaction.reducer";
import * as transactionSelectors from "../store/selectors/transaction.selector";
import * as transactionActions from "../store/actions/transaction.action";

@Injectable({
  providedIn: "root",
})
export class SalesGuard implements CanActivate {
  constructor(
    private productStore: Store<ProductState>,
    private adminStore: Store<TransactionState>
  ) {}

  canActivate() {
    return this.checkProducts().pipe(
      switchMap(() => {
        return of(true);
      }),
      catchError(() => of(false))
    );
  }

  checkProducts() {
    return this.productStore.pipe(
      select(productSelectors.getIsLoaded),
      withLatestFrom(
        this.adminStore.pipe(select(transactionSelectors.getIsLoaded))
      ),
      tap(([productsLoaded, transactionsLoaded]) => {
        if (!productsLoaded) {
          this.productStore.dispatch(new productActions.GetProducts());
        }

        if (!transactionsLoaded) {
          this.adminStore.dispatch(new transactionActions.GetTransactions());
        }
      }),
      filter(
        ([productsLoaded, transactionsLoaded]) =>
          productsLoaded || transactionsLoaded
      ),
      take(1)
    );
  }
}
