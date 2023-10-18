import { Action } from "@ngrx/store";
import { Product } from "../../models/product";

export const GET_PRODUCTS = "[Products] Get Products";
export const GET_PRODUCTS_SUCCESS = "[Products] Get Products Success";
export const GET_PRODUCTS_FAIL = "[Products] Get Products Fail";

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

export type ProductActions = GetProducts | GetProductsFail | GetProductsSuccess;
