import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";

import { Store, select } from "@ngrx/store";

import { Observable, of } from "rxjs";
import { tap, take, filter, switchMap } from "rxjs/operators";

import { ProductsState } from "../store/reducers";
import * as productSelectors from "../store/selectors/product.selector";
import * as productActions from "../store/actions/product.action";

@Injectable({
  providedIn: "root",
})
export class CartGuard implements CanActivate {
  canActivate() {
    return this.storeLoaded().pipe(switchMap(() => of(true)));
  }

  constructor(private store: Store<ProductsState>) {}

  storeLoaded() {
    return this.store.pipe(
      select(productSelectors.getIsLoaded),
      tap((loaded) => {
        if (!loaded) {
          this.store.dispatch(new productActions.GetProducts());
        }
      }),
      filter((loaded) => loaded),
      take(1)
    );
  }
}
