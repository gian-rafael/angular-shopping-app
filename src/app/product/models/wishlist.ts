import { Product } from "./product";

export interface WishlistItem {
  id?: number;
  username: string;
  userId: number;
  productId: number;
}

export interface WishlistItemDetailed extends WishlistItem {
  product: Product;
}
