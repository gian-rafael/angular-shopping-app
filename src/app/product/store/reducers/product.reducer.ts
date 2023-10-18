import { Product } from "../../models/product";
import { ProductActions } from "../actions";
import * as productActions from "../actions";

export interface ProductState {
  entities: { [id: number]: Product };
  isLoading: boolean;
  isLoaded: boolean;
  error: any;
}

const initialState: ProductState = {
  entities: {},
  isLoading: false,
  isLoaded: false,
  error: null,
};

export function reducer(
  state: ProductState = initialState,
  action: ProductActions
): ProductState {

  switch (action.type) {
    case productActions.GET_PRODUCTS: {
      return { ...state, isLoading: true };
    }

    case productActions.GET_PRODUCTS_SUCCESS: {
      const payload = action.payload;

      const entities = payload.reduce(
        (products, product) => ({ ...products, [product.id]: product }),
        {}
      );
      return { ...state, isLoaded: true, isLoading: false, entities };
    }

    case productActions.GET_PRODUCTS_FAIL: {
      const error = action.payload;
      return { ...state, isLoading: false, error };
    }
  }

  return state;
}

export const getProductEntities = (state: ProductState) => {
  return state.entities;
};
export const getIsLoading = (state: ProductState) => state.isLoading;
export const getIsLoaded = (state: ProductState) => state.isLoaded;
