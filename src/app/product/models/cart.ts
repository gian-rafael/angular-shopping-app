import { Product } from "./product";

export interface CartItem {
  id?: number;
  username: string;
  userId: number;
  qty: number;
  productId: number;
}

export interface CartItemDetailed extends CartItem {
  product: Product;
}

export interface AddToCartRequest {
  product: Product;
  quantity: number;
}