export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  img: string;
  stocks: number;
}

export type ProductWithSales = Product & { sold: number; total: number };
