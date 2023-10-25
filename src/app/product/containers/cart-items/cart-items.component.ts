import { Component, OnInit } from "@angular/core";

import { Store, select } from "@ngrx/store";

import { Observable } from "rxjs";
import { switchMap, map, take, tap } from "rxjs/operators";

import { CartState } from "../../store/reducers/cart.reducer";
import { WishlistState } from "./../../store/reducers/wishlist.reducer";
import * as cartActions from "../../store/actions/cart.action";
import * as wishlistActions from "../../store/actions/wishlist.action";
import * as selectors from "../../store/selectors/cart.selector";

import { CartItem, CartItemDetailed } from "../../models/cart";
import { ProductsState } from "../../store/reducers";

@Component({
  selector: "cart-items",
  templateUrl: "./cart-items.component.html",
  styleUrls: ["./cart-items.component.scss"],
})
export class CartItemsComponent implements OnInit {
  cart$: Observable<CartItemDetailed[]>;
  cartEntities$: Observable<{ [key: number]: CartItemDetailed }>;
  selected$: Observable<number[]>;
  loading$: Observable<boolean>;
  checkingOut$: Observable<boolean>;

  get selectedItems$() {
    return this.store.pipe(
      select(selectors.getSelectedItems),
      switchMap((selected) =>
        this.cartEntities$.pipe(
          map((entities) =>
            Object.values(entities).filter((entity) =>
              selected.includes(entity.id)
            )
          )
        )
      )
    );
  }

  get totalPrice() {
    return this.selectedItems$.pipe(
      map((items) =>
        items.reduce(
          (total, nextItem) => total + nextItem.product.price * nextItem.qty,
          0
        )
      )
    );
  }

  readonly modalId = "checkoutModal";
  get checkoutModal() {
    // @ts-ignore
    return $(`#${this.modalId}`);
  }

  constructor(private store: Store<ProductsState>) {}

  ngOnInit() {
    this.store.dispatch(new cartActions.GetCartItems());
    this.cart$ = this.store.pipe(select(selectors.getCartItemListDetailed));
    this.cartEntities$ = this.store.pipe(
      select(selectors.getCartItemEntitiesDetailed)
    );
    this.selected$ = this.store.pipe(select(selectors.getSelectedItems));
    this.loading$ = this.store.pipe(select(selectors.getIsLoading));
    this.checkingOut$ = this.store.pipe(
      select(selectors.getCheckingOut),
      tap((val) => {
        if (!val) {
          // @ts-ignore
          this.checkoutModal.modal("hide");
        }
      })
    );
  }

  handleRemoveFromCart(cartItem: CartItemDetailed) {
    this.store.dispatch(new cartActions.RemoveFromCart(cartItem.id));
  }

  handleAddToWishlist(cartItem: CartItemDetailed) {
    this.store.dispatch(new wishlistActions.AddWishlist(cartItem.product));
  }

  handleCheckout() {
    // @ts-ignore
    this.checkoutModal.modal("show");
  }

  handleItemSelect(id: number) {
    this.store.dispatch(new cartActions.SelectForCheckout(id));
  }

  handleQuantityChange(cartItem: CartItem) {
    this.store.dispatch(new cartActions.UpdateCartItemQuantity(cartItem));
  }

  confirmCheckout() {
    this.selectedItems$
      .pipe(take(1))
      .subscribe((selectedItems) =>
        this.store.dispatch(new cartActions.Checkout(selectedItems))
      );
  }
}
