import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";

import { Store, select } from "@ngrx/store";

import { of } from "rxjs";
import { tap, take, switchMap, catchError, filter } from "rxjs/operators";

import { ProductState } from "../../product/store/reducers/product.reducer";
import * as productSelectors from "../../product/store/selectors/product.selector";
import * as productActions from "../../product/store/actions/product.action";

@Injectable({
  providedIn: "root",
})
export class InventoryGuard implements CanActivate {
  constructor(private productStore: Store<ProductState>) {}

  canActivate() {
    return this.checkProducts().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkProducts() {
    return this.productStore.pipe(
      select(productSelectors.getIsLoaded),
      tap((productsLoaded) => {
        if (!productsLoaded) {
          this.productStore.dispatch(new productActions.GetProducts());
        }
      }),
      filter((loaded) => loaded),
      take(1)
    );
  }
}
