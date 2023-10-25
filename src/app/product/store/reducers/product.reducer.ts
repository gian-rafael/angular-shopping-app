import { Product } from "../../models/product";
import { ProductActions } from "../actions";
import * as productActions from "../actions";

export interface ProductState {
  entities: { [id: number]: Product };
  queriedItems: Product[];
  isLoading: boolean;
  isLoaded: boolean;
  error: any;
}

const initialState: ProductState = {
  entities: {},
  queriedItems: [],
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

    case productActions.ADD_PRODUCT_SUCCESS: {
      const product = action.payload;
      const entities = { ...state.entities, [product.id]: product };
      return { ...state, entities };
    }

    case productActions.ADD_PRODUCT_FAIL: {
      console.error(action.payload);
      return { ...state };
    }

    case productActions.DELETE_PRODUCT_SUCCESS: {
      const { id } = action.payload;
      const { [id]: _, ...entities } = state.entities;
      return { ...state, entities };
    }

    case productActions.DELETE_PRODUCT_FAIL: {
      console.error(action.payload);
      return { ...state };
    }

    case productActions.UPDATE_PRODUCT_SUCCESS: {
      const product = action.payload;
      const entities = { ...state.entities, [product.id]: product };
      return { ...state, entities };
    }

    case productActions.DELETE_PRODUCT_FAIL: {
      console.error(action.payload);
      return { ...state };
    }

    case productActions.SEARCH_PRODUCTS: {
      const query = action.payload;
      const items = Object.values(state.entities);
      const regexp = new RegExp(`.*${query}.*`, "i");
      let queriedItems = items.filter((item) => regexp.test(item.name));
      if (query.trim() === "") {
        queriedItems = items;
      }
      // console.log("Search: ", query);
      // console.log("Search Result: ", queriedItems);
      return { ...state, queriedItems };
    }
  }

  return state;
}

export const getProductEntities = (state: ProductState) => state.entities;
export const getQueriedProducts = (state: ProductState) => state.queriedItems;
export const getIsLoading = (state: ProductState) => state.isLoading;
export const getIsLoaded = (state: ProductState) => state.isLoaded;
