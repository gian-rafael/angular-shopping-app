export interface Transaction {
  id?: number;
  userId: number;
  username: string;
  order: Order[];
}

export interface Order {
  productId: number;
  qty: number;
  total: number;
}
