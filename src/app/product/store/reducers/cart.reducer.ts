import { CartItem } from "../../models/cart";
import { CartActions } from "../actions";

import * as cartActions from "../actions/cart.action";

export interface CartState {
  cartItemEntities: { [id: number]: CartItem };
  isLoading: boolean;
  isLoaded: boolean;
  selectedItems: number[];
  checkingOut: boolean;
  error?: any;
}

export const initialState: CartState = {
  cartItemEntities: {},
  selectedItems: [],
  isLoading: false,
  isLoaded: false,
  checkingOut: false,
};

export function reducer(
  state: CartState = initialState,
  action: CartActions
): CartState {
  switch (action.type) {
    case cartActions.GET_CART_ITEMS: {
      return { ...state, isLoading: true };
    }

    case cartActions.GET_CART_ITEMS_SUCCESS: {
      const cartItems = action.payload;

      const cartItemEntities = cartItems.reduce(
        (items, nextItem) => ({ ...items, [nextItem.id]: nextItem }),
        {}
      );

      return { ...state, isLoaded: true, isLoading: false, cartItemEntities };
    }

    case cartActions.GET_CART_ITEMS_FAIL: {
      const error = action.payload;
      return { ...state, isLoading: false, error };
    }

    case cartActions.ADD_TO_CART_SUCCESS: {
      const cartItem = action.payload;
      return {
        ...state,
        cartItemEntities: {
          ...state.cartItemEntities,
          [cartItem.id]: cartItem,
        },
      };
    }

    case cartActions.ADD_TO_CART_FAIL: {
      console.error(action.payload);
      return { ...state };
    }

    case cartActions.REMOVE_FROM_CART_SUCCESS: {
      const id = action.payload;
      const { [id]: _, ...cartItemEntities } = state.cartItemEntities;
      return { ...state, cartItemEntities };
    }

    case cartActions.SELECT_FOR_CHECKOUT: {
      const payload = action.payload;
      let selectedItems: number[] = [];
      if (typeof payload === "number") {
        const itemIndex = state.selectedItems.indexOf(payload);
        let selectedItems = state.selectedItems;

        if (itemIndex === -1) {
          selectedItems = [...selectedItems, payload];
        } else {
          selectedItems = selectedItems.filter((item) => item !== payload);
        }
        return { ...state, selectedItems };
      } else {
        selectedItems = payload;
      }
      return { ...state, selectedItems };
    }

    case cartActions.UPDATE_CART_ITEM_QUANTITY_SUCCESS: {
      const { payload: cartItem } = action;
      const cartItemEntities = {
        ...state.cartItemEntities,
        [cartItem.id]: cartItem,
      };
      return { ...state, cartItemEntities };
    }

    case cartActions.CHECKOUT: {
      return { ...state, checkingOut: true };
    }

    case cartActions.CHECKOUT_SUCCESS: {
      const ids = action.payload;
      const cartItemEntities = { ...state.cartItemEntities };
      ids.forEach((id) => delete cartItemEntities[id]);
      return {
        ...state,
        checkingOut: false,
        selectedItems: [],
        cartItemEntities,
      };
    }

    case cartActions.CHECKOUT_FAIL: {
      console.log(action.payload);

      return { ...state, checkingOut: false };
    }
  }

  return state;
}

export const getCartItemEntities = (state: CartState) => state.cartItemEntities;
export const getCartItemList = (state: CartState) =>
  Object.values(state.cartItemEntities);
export const getSelectedItems = (state: CartState) => state.selectedItems;
export const getIsLoading = (state: CartState) => state.isLoading;
export const getIsLoaded = (state: CartState) => state.isLoaded;
export const getCheckingOut = (state: CartState) => state.checkingOut;
export const getError = (state: CartState) => state.error;
