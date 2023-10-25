import { createSelector } from "@ngrx/store";

import { getProductsState } from "../reducers/index";

import { getProductEntities } from "./product.selector";
import * as selectors from "../reducers/cart.reducer";
import { CartItemDetailed } from "../../models/cart";

export const getCartState = createSelector(
  getProductsState,
  (state) => state.cart
);
export const getCartItemEntities = createSelector(
  getCartState,
  selectors.getCartItemEntities
);
export const getCartItemList = createSelector(
  getCartState,
  selectors.getCartItemList
);
export const getCartItemEntitiesDetailed = createSelector(
  getCartItemEntities,
  getProductEntities,
  (cartItems, productEntities) => {
    return Object.keys(cartItems).reduce(
      (items, nextKey) => ({
        ...items,
        [nextKey]: {
          ...cartItems[nextKey],
          product: productEntities[cartItems[nextKey].productId],
        },
      }),
      {}
    ) as { [id: number]: CartItemDetailed };
  }
);
export const getCartItemListDetailed = createSelector(
  getCartItemEntitiesDetailed,
  (entitites) => Object.values(entitites)
);

export const getSelectedItems = createSelector(
  getCartState,
  selectors.getSelectedItems
);

export const getIsLoading = createSelector(
  getCartState,
  selectors.getIsLoading
);
export const getIsLoaded = createSelector(getCartState, selectors.getIsLoaded);
export const getCheckingOut = createSelector(getCartState, selectors.getCheckingOut)
export const getError = createSelector(getCartState, selectors.getError);
