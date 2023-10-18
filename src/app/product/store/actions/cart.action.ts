import { Action } from "@ngrx/store";
import { AddToCartRequest } from "../../components/product-item/product-item.component";
import { CartItem } from "../../models/cart";

export const GET_CART_ITEMS = "[Cart] Get cart items";
export const GET_CART_ITEMS_SUCCESS = "[Cart] Get cart items success";
export const GET_CART_ITEMS_FAIL = "[Cart] Get cart items fail";

export const ADD_TO_CART = "[Cart] Add to cart";
export const ADD_TO_CART_SUCCESS = "[Cart] Add to cart success";
export const ADD_TO_CART_FAIL = "[Cart] Add to cart fail";

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

export type CartActions = AddToCart | AddToCartFail | AddToCartSuccess;
