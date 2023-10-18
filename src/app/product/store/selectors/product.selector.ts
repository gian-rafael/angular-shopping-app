import { createSelector } from "@ngrx/store";

import { getProductsState } from "../reducers";
import * as fromProducts from "../reducers/product.reducer";

export const getProductState = createSelector(
  getProductsState,
  (state) => state.products
);

export const getProductEntities = createSelector(
  getProductState,
  fromProducts.getProductEntities
);
export const getProductList = createSelector(getProductEntities, (entities) =>
  Object.values(entities)
);
export const getIsLoaded = createSelector(
  getProductState,
  fromProducts.getIsLoaded
);
export const getIsLoading = createSelector(
  getProductState,
  fromProducts.getIsLoading
);
