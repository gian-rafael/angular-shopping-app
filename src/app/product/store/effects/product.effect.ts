import { Injectable } from "@angular/core";

import { Effect, Actions, ofType } from "@ngrx/effects";

import { of } from "rxjs";
import { switchMap, map, catchError, repeat } from "rxjs/operators";

import * as productActions from "../actions/product.action";
import { ProductService } from "../../services/product.service";
import { Router } from "@angular/router";

@Injectable()
export class ProductEffect {
  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private router: Router
  ) {}

  @Effect()
  getProducts$ = this.actions$.pipe(
    ofType(productActions.GET_PRODUCTS),
    switchMap(() => this.productService.getProducts()),
    map((products) => new productActions.GetProductsSuccess(products)),
    catchError((error) => of(new productActions.GetProductsFail(error))),
    repeat()
  );

  @Effect()
  addProduct$ = this.actions$.pipe(
    ofType(productActions.ADD_PRODUCT),
    switchMap(({ payload }: productActions.AddProduct) =>
      this.productService.addProduct(payload).pipe(
        map((product) => new productActions.AddProductSuccess(product)),
        catchError((error) => of(new productActions.AddProductFail(error)))
      )
    )
  );

  @Effect()
  deleteProduct$ = this.actions$.pipe(
    ofType(productActions.DELETE_PRODUCT),
    switchMap(({ payload: product }: productActions.DeleteProduct) =>
      this.productService.deleteProduct(product.id).pipe(
        map(() => new productActions.DeleteProductSuccess(product)),
        catchError((error) => of(new productActions.DeleteProductFail(error)))
      )
    )
  );

  @Effect()
  updateProduct$ = this.actions$.pipe(
    ofType(productActions.UPDATE_PRODUCT),
    switchMap((action: productActions.UpdateProduct) =>
      this.productService.updateProduct(action.payload).pipe(
        map(() => {
          this.router.navigate(["inventory"]);
          return new productActions.UpdateProductSuccess(action.payload);
        }),
        catchError((error) => of(new productActions.UpdateProductFail(error)))
      )
    ),
    repeat()
  );
}
