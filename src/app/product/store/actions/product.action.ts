import { Action } from "@ngrx/store";
import { Product } from "../../models/product";

export const GET_PRODUCTS = "[Products] Get Products";
export const GET_PRODUCTS_SUCCESS = "[Products] Get Products Success";
export const GET_PRODUCTS_FAIL = "[Products] Get Products Fail";

export const ADD_PRODUCT = "[Products] Add Product";
export const ADD_PRODUCT_SUCCESS = "[Products] Add Product Success";
export const ADD_PRODUCT_FAIL = "[Products] Add Product Fail";

export const DELETE_PRODUCT = "[Products] Delete Product";
export const DELETE_PRODUCT_SUCCESS = "[Products] Delete Product Success";
export const DELETE_PRODUCT_FAIL = "[Products] Delete Product Fail";

export const UPDATE_PRODUCT = "[Products] Update Product";
export const UPDATE_PRODUCT_SUCCESS = "[Products] Update Product Success";
export const UPDATE_PRODUCT_FAIL = "[Products] Update Product Fail";

export const SEARCH_PRODUCTS = "[Products] Search Products";

export class GetProducts implements Action {
  readonly type = GET_PRODUCTS;
}

export class GetProductsSuccess implements Action {
  readonly type = GET_PRODUCTS_SUCCESS;
  constructor(public payload: Product[]) {}
}

export class GetProductsFail implements Action {
  readonly type = GET_PRODUCTS_FAIL;
  constructor(public payload: any) {}
}

export class DeleteProduct implements Action {
  readonly type = DELETE_PRODUCT;
  constructor(public payload: Product) {}
}

export class DeleteProductSuccess implements Action {
  readonly type = DELETE_PRODUCT_SUCCESS;
  constructor(public payload: Product) {}
}

export class DeleteProductFail implements Action {
  readonly type = DELETE_PRODUCT_FAIL;
  constructor(public payload: any) {}
}

export class AddProduct implements Action {
  readonly type = ADD_PRODUCT;
  constructor(public payload: Product) {}
}

export class AddProductSuccess implements Action {
  readonly type = ADD_PRODUCT_SUCCESS;
  constructor(public payload: Product) {}
}

export class AddProductFail implements Action {
  readonly type = ADD_PRODUCT_FAIL;
  constructor(public payload: any) {}
}

export class UpdateProduct implements Action {
  readonly type = UPDATE_PRODUCT;
  constructor(public payload: Product) {}
}

export class UpdateProductSuccess implements Action {
  readonly type = UPDATE_PRODUCT_SUCCESS;
  constructor(public payload: Product) {}
}

export class UpdateProductFail implements Action {
  readonly type = UPDATE_PRODUCT_FAIL;
  constructor(public payload: any) {}
}

export class SearchProducts implements Action {
  readonly type = SEARCH_PRODUCTS;
  constructor(public payload: string) {}
}

export type ProductActions =
  | GetProducts
  | GetProductsFail
  | GetProductsSuccess
  | DeleteProduct
  | DeleteProductSuccess
  | DeleteProductFail
  | SearchProducts
  | UpdateProduct
  | UpdateProductSuccess
  | UpdateProductFail
  | AddProduct
  | AddProductSuccess
  | AddProductFail;
