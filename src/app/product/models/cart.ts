import { Product } from "./product";

export interface CartItem {
  id?: number;
  cartId: number;
  username: string;
  userId: number;
  qty: number;
  productId: number;
}
