import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";

import * as fromProducts from "./product.reducer";
import * as fromCart from "./cart.reducer";
import * as fromWishlist from "./wishlist.reducer";

export interface ProductsState {
  products: fromProducts.ProductState;
  cart: fromCart.CartState;
  wishlist: fromWishlist.WishlistState;
}

export const reducers: ActionReducerMap<ProductsState> = {
  products: fromProducts.reducer,
  cart: fromCart.reducer,
  wishlist: fromWishlist.reducer,
};

export const getProductsState =
  createFeatureSelector<ProductsState>("products");
