import { Action } from "@ngrx/store";
import { WishlistItem } from "../../models/wishlist";
import { Product } from "../../models/product";

export const GET_WISHLIST = "[Wishlist] Get wishlist";
export const GET_WISHLIST_SUCCESS = "[Wishlist] Get wishlist success";
export const GET_WISHLIST_FAIL = "[Wishlist] Get wishlist fail";

export const ADD_WISHLIST = "[Wishlist] Add wishlist";
export const ADD_WISHLIST_SUCCESS = "[Wishlist] Add wishlist success";
export const ADD_WISHLIST_FAIL = "[Wishlist] Add wishlist fail";

export const REMOVE_WISHLIST = "[Wishlist] Remove wishlist";
export const REMOVE_WISHLIST_SUCCESS = "[Wishlist] Remove wishlist success";
export const REMOVE_WISHLIST_FAIL = "[Wishlist] Remove wishlist fail";

export const ADD_FROM_WISHLIST = "[Wishlist] Add from wishlist";
export const ADD_FROM_WISHLIST_SUCCESS = "[Wishlist] Add from wishlist success";
export const ADD_FROM_WISHLIST_FAIL = "[Wishlist] Add from wishlist fail";

export class GetWishlist implements Action {
  readonly type = GET_WISHLIST;
  constructor() {}
}

export class GetWishlistSuccess implements Action {
  readonly type = GET_WISHLIST_SUCCESS;
  constructor(public payload: WishlistItem[]) {}
}

export class GetWishlistFail implements Action {
  readonly type = GET_WISHLIST_FAIL;
  constructor(public payload: any) {}
}

export class AddWishlist implements Action {
  readonly type = ADD_WISHLIST;
  constructor(public payload: Product) {}
}

export class AddWishlistSuccess implements Action {
  readonly type = ADD_WISHLIST_SUCCESS;
  constructor(public payload: WishlistItem) {}
}

export class AddWishlistFail implements Action {
  readonly type = ADD_WISHLIST_FAIL;
  constructor(public payload: any) {}
}

export class RemoveWishlist implements Action {
  readonly type = REMOVE_WISHLIST;
  constructor(public payload: WishlistItem) {}
}

export class RemoveWishlistSuccess implements Action {
  readonly type = REMOVE_WISHLIST_SUCCESS;
  constructor(public payload: WishlistItem) {}
}

export class RemoveWishlistFail implements Action {
  readonly type = REMOVE_WISHLIST_FAIL;
  constructor(public payload: any) {}
}

export type WishlistActions =
  | AddWishlist
  | AddWishlistSuccess
  | AddWishlistFail
  | RemoveWishlist
  | RemoveWishlistSuccess
  | RemoveWishlistFail
  | GetWishlist
  | GetWishlistSuccess
  | GetWishlistFail;
