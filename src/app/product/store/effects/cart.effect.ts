import { Injectable } from "@angular/core";

import { Store, select } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";

import { of } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";

import * as fromAuthStore from "../../../auth/store/reducers";
import * as authSelectors from "../../../auth/store/selectors";

import * as cartActions from "../actions/cart.action";

import { CartService } from "../../services/cart.service";

@Injectable()
export class CartEffect {
  constructor(
    private actions$: Actions,
    private authStore: Store<fromAuthStore.AppAuthState>,
    private cartService: CartService
  ) {}

  @Effect()
  addToCart$ = this.actions$.pipe(
    ofType(cartActions.ADD_TO_CART),
    switchMap((action: cartActions.AddToCart) =>
      this.authStore.pipe(
        select(authSelectors.getUser),
        switchMap((user) =>
          this.cartService.addToCart({ user, request: action.payload })
        ),
        map((cartItem) => new cartActions.AddToCartSuccess(cartItem)),
        catchError((error) => of(new cartActions.AddToCartFail(error)))
      )
    )
  );
}
