import { Action } from "@ngrx/store";
import { AddToCartRequest } from "../../components/product-item/product-item.component";
import { CartItem, CartItemDetailed } from "../../models/cart";

export const GET_CART_ITEMS = "[Cart] Get cart items";
export const GET_CART_ITEMS_SUCCESS = "[Cart] Get cart items success";
export const GET_CART_ITEMS_FAIL = "[Cart] Get cart items fail";

export const ADD_TO_CART = "[Cart] Add to cart";
export const ADD_TO_CART_SUCCESS = "[Cart] Add to cart success";
export const ADD_TO_CART_FAIL = "[Cart] Add to cart fail";

export const REMOVE_FROM_CART = "[Cart] Remove from cart";
export const REMOVE_FROM_CART_SUCCESS = "[Cart] Remove from cart success";
export const REMOVE_FROM_CART_FAIL = "[Cart] Remove from cart fail";

export const UPDATE_CART_ITEM_QUANTITY = "[Cart] Update cart item quantity";
export const UPDATE_CART_ITEM_QUANTITY_SUCCESS =
  "[Cart] Update cart item quantity success";
export const UPDATE_CART_ITEM_QUANTITY_FAIL =
  "[Cart] Update cart item quantity fail";

export const SELECT_FOR_CHECKOUT = "[Cart] Select for checkout";

export const CHECKOUT = "[Cart] Checkout";
export const CHECKOUT_SUCCESS = "[Cart] Checkout success";
export const CHECKOUT_FAIL = "[Cart] Checkout fail";

export class GetCartItems implements Action {
  readonly type = GET_CART_ITEMS;
  constructor() {}
}

export class GetCartItemsSuccess implements Action {
  readonly type = GET_CART_ITEMS_SUCCESS;
  constructor(public payload: CartItem[]) {}
}

export class GetCartItemsFail implements Action {
  readonly type = GET_CART_ITEMS_FAIL;
  constructor(public payload: any) {}
}

export class AddToCart implements Action {
  readonly type = ADD_TO_CART;
  constructor(public payload: AddToCartRequest) {}
}

export class AddToCartSuccess implements Action {
  readonly type = ADD_TO_CART_SUCCESS;
  constructor(public payload: CartItem) {}
}

export class AddToCartFail implements Action {
  readonly type = ADD_TO_CART_FAIL;
  constructor(public payload: any) {}
}

export class UpdateCartItemQuantity implements Action {
  readonly type = UPDATE_CART_ITEM_QUANTITY;
  constructor(public payload: CartItem) {}
}

export class UpdateCartItemQuantitySuccess implements Action {
  readonly type = UPDATE_CART_ITEM_QUANTITY_SUCCESS;
  constructor(public payload: CartItem) {}
}

export class UpdateCartItemQuantityFail implements Action {
  readonly type = UPDATE_CART_ITEM_QUANTITY_FAIL;
  constructor(public payload: any) {}
}

export class RemoveFromCart implements Action {
  readonly type = REMOVE_FROM_CART;
  constructor(public payload: number) {}
}

export class RemoveFromCartSuccess implements Action {
  readonly type = REMOVE_FROM_CART_SUCCESS;
  constructor(public payload: number) {}
}

export class RemoveFromCartFail implements Action {
  readonly type = REMOVE_FROM_CART_FAIL;
  constructor(public payload: any) {}
}

export class SelectForCheckout implements Action {
  readonly type = SELECT_FOR_CHECKOUT;
  constructor(public payload: number | number[]) {}
}

export class Checkout implements Action {
  readonly type = CHECKOUT;
  constructor(public payload: CartItemDetailed[]) {}
}

export class CheckoutSuccess implements Action {
  readonly type = CHECKOUT_SUCCESS;
  constructor(public payload: number[]) {}
}

export class CheckoutFail implements Action {
  readonly type = CHECKOUT_FAIL;
  constructor(public payload: any) {}
}

export type CartActions =
  | AddToCart
  | AddToCartFail
  | AddToCartSuccess
  | RemoveFromCart
  | RemoveFromCartSuccess
  | RemoveFromCartFail
  | GetCartItems
  | GetCartItemsSuccess
  | GetCartItemsFail
  | SelectForCheckout
  | UpdateCartItemQuantity
  | UpdateCartItemQuantitySuccess
  | UpdateCartItemQuantityFail
  | Checkout
  | CheckoutSuccess
  | CheckoutFail;
