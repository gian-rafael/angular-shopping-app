import { Injectable } from "@angular/core";

import { Store, select } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";

import { of } from "rxjs";
import { switchMap, map, catchError, repeat } from "rxjs/operators";

import * as fromAuthStore from "../../../auth/store/reducers";
import * as authSelectors from "../../../auth/store/selectors";

import * as cartActions from "../actions/cart.action";

import { CartService } from "../../services/cart.service";
import { Order, Transaction } from "../../models/transaction";
import { Product } from "../../models/product";
import { Router } from "@angular/router";
import { ToastService } from "src/app/toast.service";

@Injectable()
export class CartEffect {
  constructor(
    private actions$: Actions,
    private authStore: Store<fromAuthStore.AppAuthState>,
    private cartService: CartService,
    private router: Router,
    private toastService: ToastService
  ) {}

  @Effect()
  getCartItems$ = this.actions$.pipe(
    ofType(cartActions.GET_CART_ITEMS),
    switchMap(() => this.authStore.pipe(select(authSelectors.getUser))),
    switchMap((user) => this.cartService.getCartItems(user)),
    map((cartItems) => new cartActions.GetCartItemsSuccess(cartItems)),
    catchError((error) => of(new cartActions.GetCartItemsFail(error))),
    repeat()
  );

  @Effect()
  addToCart$ = this.actions$.pipe(
    ofType(cartActions.ADD_TO_CART),
    switchMap((action: cartActions.AddToCart) =>
      this.authStore.pipe(
        select(authSelectors.getUser),
        switchMap((user) => {
          if (user)
            return this.cartService.addToCart({
              user,
              request: action.payload,
            });
          this.router.navigate(["/auth"]);
          throw new Error("User Not Logged In");
        }),
        map((cartItem) => {
          this.toastService.showToast({
            description: "Item added to cart.",
            title: "Add To Cart",
            type: "success",
          });
          return new cartActions.AddToCartSuccess(cartItem);
        }),
        catchError((error) => of(new cartActions.AddToCartFail(error)))
      )
    ),
    repeat()
  );

  @Effect()
  removeFromCart$ = this.actions$.pipe(
    ofType(cartActions.REMOVE_FROM_CART),
    switchMap((action: cartActions.RemoveFromCart) =>
      this.cartService.removeFromCart(action.payload).pipe(
        map(() => new cartActions.RemoveFromCartSuccess(action.payload)),
        catchError((error) => of(new cartActions.RemoveFromCartFail(error)))
      )
    ),
    repeat()
  );

  @Effect()
  updateCartItemQuantity$ = this.actions$.pipe(
    ofType(cartActions.UPDATE_CART_ITEM_QUANTITY),
    switchMap((action: cartActions.UpdateCartItemQuantity) =>
      this.cartService.updateCartItem(action.payload).pipe(
        map(
          (cartItem) => new cartActions.UpdateCartItemQuantitySuccess(cartItem)
        ),
        catchError((error) =>
          of(new cartActions.UpdateCartItemQuantityFail(error))
        )
      )
    ),
    repeat()
  );

  @Effect()
  checkout$ = this.actions$.pipe(
    ofType(cartActions.CHECKOUT),
    switchMap(({ payload }: cartActions.Checkout) => {
      const [{ userId, username }] = payload;
      const orders = payload.map<Order>((item) => ({
        productId: item.productId,
        qty: item.qty,
        total: item.product.price * item.qty,
      }));
      const updatedProducts: Product[] = payload.map((items) => ({
        ...items.product,
        stocks: items.product.stocks - items.qty,
      }));
      const ids = payload.map((item) => item.id);
      const transaction: Transaction = { userId, username, order: orders };
      return this.cartService
        .placeOrder(transaction, ids, updatedProducts)
        .pipe(
          switchMap(() => of(new cartActions.CheckoutSuccess(ids))),
          catchError((error) => of(new cartActions.CheckoutFail(error)))
        );
    })
  );
}
