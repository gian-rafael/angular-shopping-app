import { WishlistItem } from "../../models/wishlist";

import * as wishlistActions from "../actions/wishlist.action";

export interface WishlistState {
  wishlistEntities: { [id: number]: WishlistItem };
  isLoaded: boolean;
  isLoading: boolean;
}

export const initialState: WishlistState = {
  wishlistEntities: {},
  isLoaded: false,
  isLoading: false,
};

export function reducer(
  state: WishlistState = initialState,
  action: wishlistActions.WishlistActions
): WishlistState {
  switch (action.type) {
    case wishlistActions.GET_WISHLIST: {
      return { ...state, isLoading: true };
    }

    case wishlistActions.GET_WISHLIST_SUCCESS: {
      const wishlistItems = action.payload;
      const wishlistEntities = wishlistItems.reduce(
        (entities, wishlist) => ({
          ...entities,
          [wishlist.id]: wishlist,
        }),
        {}
      );

      return { ...state, isLoaded: true, isLoading: false, wishlistEntities };
    }

    case wishlistActions.ADD_WISHLIST_FAIL: {
      const payload = action.payload;
      return { ...state, isLoaded: false, isLoading: false };
    }

    case wishlistActions.REMOVE_WISHLIST_SUCCESS: {
      const { id } = action.payload;
      const { [id]: _, ...wishlistEntities } = state.wishlistEntities;
      return { ...state, wishlistEntities };
    }
  }

  return state;
}

export const getWishlistEntities = (state: WishlistState) =>
  state.wishlistEntities;
export const getIsLoading = (state: WishlistState) => state.isLoading;
export const getIsLoaded = (state: WishlistState) => state.isLoaded;
