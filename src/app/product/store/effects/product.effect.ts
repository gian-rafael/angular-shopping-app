import { Injectable } from "@angular/core";

import { Effect, Actions, ofType } from "@ngrx/effects";

import { of } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";

import * as productActions from "../actions/product.action";
import { ProductService } from "../../services/product.service";

@Injectable()
export class ProductEffect {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  @Effect()
  getProducts$ = this.actions$.pipe(
    ofType(productActions.GET_PRODUCTS),
    switchMap(() => this.productService.getProducts()),
    map((products) => new productActions.GetProductsSuccess(products)),
    catchError((error) => of(new productActions.GetProductsFail(error)))
  );
}
