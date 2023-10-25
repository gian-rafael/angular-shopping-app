import { createSelector } from "@ngrx/store";

import { getProductsState } from "../reducers";

import * as productSelectors from "./product.selector";

import * as fromReducer from "../reducers/wishlist.reducer";
import { WishlistItemDetailed } from "../../models/wishlist";

export const getWishlistState = createSelector(
  getProductsState,
  (state) => state.wishlist
);

export const getWishlistEntities = createSelector(
  getWishlistState,
  fromReducer.getWishlistEntities
);

export const getWishlistEntitiesDetailed = createSelector(
  getWishlistEntities,
  productSelectors.getProductEntities,
  (wishlistEntities, productEntities) => {
    return Object.keys(wishlistEntities).reduce(
      (entities, nextId) => ({
        ...entities,
        [nextId]: {
          ...wishlistEntities[nextId],
          product: productEntities[wishlistEntities[nextId].productId],
        },
      }),
      {}
    ) as { [id: number]: WishlistItemDetailed };
  }
);

export const getWishlistItems = createSelector(
  getWishlistEntities,
  (entities) => Object.values(entities)
);

export const getWishlistItemsDetailed = createSelector(
  getWishlistEntitiesDetailed,
  (entities) => Object.values(entities)
);

export const getIsLoaded = createSelector(
  getWishlistState,
  fromReducer.getIsLoaded
);

export const getIsLoading = createSelector(
  getWishlistState,
  fromReducer.getIsLoading
);
