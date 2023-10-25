import { createSelector } from "@ngrx/store";

import { ProductsState, getProductsState } from "../reducers";
import * as fromProducts from "../reducers/product.reducer";
import * as fromTransactions from "../../../admin/store/selectors/transaction.selector";
import { Product, ProductWithSales } from "../../models/product";
import { Transaction } from "../../models/transaction";

export const getProductState = createSelector(
  getProductsState,
  (state) => state.products
);

export const getProductEntities = createSelector(
  getProductState,
  fromProducts.getProductEntities
);

export const getQueriedProducts = createSelector(
  getProductState,
  fromProducts.getQueriedProducts
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

export const getSelectedProduct = createSelector(
  getProductEntities,
  (entities, { id }) => entities[id]
);

export const getProductListWithSales = createSelector(
  getProductList,
  fromTransactions.getTransactionlist,
  (products, transactions) => {
    const orders = transactions
      .map((transaction) => transaction.order)
      .reduce((items, nextOrder) => {
        const temp = { ...items };
        nextOrder.forEach(({ productId, qty, total }) => {
          if (productId in temp) {
            temp[productId].qty += qty;
            temp[productId].total += total;
          } else {
            temp[productId] = { qty, total };
          }
        });
        return temp;
      }, {});
    return products.map((product) => ({
      ...product,
      sold: orders[product.id] ? orders[product.id].qty : 0,
      total: orders[product.id] ? orders[product.id].total : 0,
    })) as ProductWithSales[];
  }
);

export const getQueriedProductListWithSales = createSelector(
  getQueriedProducts,
  fromTransactions.getTransactionlist,
  (products, transactions) => {
    const orders = transactions
      .map((transaction) => transaction.order)
      .reduce((items, nextOrder) => {
        const temp = { ...items };
        nextOrder.forEach(({ productId, qty, total }) => {
          if (productId in temp) {
            temp[productId].qty += qty;
            temp[productId].total += total;
          } else {
            temp[productId] = { qty, total };
          }
        });
        return temp;
      }, {});

    return products.map((product) => ({
      ...product,
      sold: orders[product.id] ? orders[product.id].qty : 0,
      total: orders[product.id] ? orders[product.id].total : 0,
    })) as ProductWithSales[];
  }
);
