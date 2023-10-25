import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";

import { Store, select } from "@ngrx/store";

import { tap, take, switchMap, filter, map } from "rxjs/operators";

import { ProductState } from "../../product/store/reducers/product.reducer";
import * as productSelectors from "../../product/store/selectors/product.selector";
import * as productActions from "../../product/store/actions/product.action";

@Injectable({
  providedIn: "root",
})
export class UpdateProductGuard implements CanActivate {
  constructor(
    private productStore: Store<ProductState>,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const id = route.params["id"];
    return this.checkSelectedProduct(id).pipe(
      map((exists) => {
        if (!exists) {
          this.router.navigate(["/"]);
        }

        return exists;
      })
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

  checkSelectedProduct(id: string) {
    return this.checkProducts().pipe(
      switchMap(() =>
        this.productStore.pipe(
          select(productSelectors.getSelectedProduct, { id })
        )
      ),
      map((item) => !!item)
    );
  }
}
