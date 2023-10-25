import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AddToCartRequest } from "../components/product-item/product-item.component";

import { UserDetails } from "src/app/auth/models/user";

import { CartItem } from "../models/cart";

import { Observable, forkJoin } from "rxjs";
import { tap, switchMap, map } from "rxjs/operators";
import { Order, Transaction } from "../models/transaction";
import { Product } from "../models/product";
import { ProductService } from "./product.service";

@Injectable({
  providedIn: "root",
})
export class CartService {
  readonly CART_ENDPOINT = "http://localhost:3000/carts";

  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) {}

  getCartItems(user: UserDetails): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.CART_ENDPOINT}?userId=${user.id}`);
  }

  addToCart(request: {
    user: UserDetails;
    request: AddToCartRequest;
  }): Observable<CartItem> {
    const { user, request: cartItemRequest } = request;
    const cartItem: CartItem = {
      productId: cartItemRequest.product.id,
      qty: cartItemRequest.quantity,
      userId: user.id,
      username: user.username,
    };
    return this.getCartItems(user).pipe(
      switchMap((items) => {
        const existing = items.find(
          (item) => item.productId === cartItem.productId
        );

        if (!existing) {
          return this.http.post<CartItem>(this.CART_ENDPOINT, cartItem);
        }

        const qty = existing.qty + cartItem.qty;
        if (qty > cartItemRequest.product.stocks) {
          throw new Error("Quantity entered exceeded remaining stock");
        }

        return this.updateCartItem({ ...existing, qty });
      })
    );
  }

  removeFromCart(id: number) {
    return this.http.delete(`${this.CART_ENDPOINT}/${id}`);
  }

  updateCartItem(cartItem: CartItem): Observable<CartItem> {
    return this.http.put<CartItem>(
      `${this.CART_ENDPOINT}/${cartItem.id}`,
      cartItem
    );
  }

  placeOrder(
    transaction: Transaction,
    cartItemIds?: number[],
    updatedProducts?: Product[]
  ) {
    return this.verifyProductStocks(transaction.order).pipe(
      switchMap((valid) => {
        if (!valid) {
          throw new Error("Insufficient Stock. Please adjust item quantity.");
        }
        return this.http
          .post(`http://localhost:3000/transactions`, transaction)
          .pipe(
            switchMap(() =>
              forkJoin([
                ...updatedProducts.map((product) =>
                  this.productService.updateProduct(product)
                ),
                ...cartItemIds.map((id) =>
                  this.http.delete(`${this.CART_ENDPOINT}/${id}`)
                ),
              ])
            )
          );
      })
    );
  }

  private verifyProductStocks(order: Order[]) {
    return this.productService.getProducts().pipe(
      map((products) => {
        const entities = products.reduce(
          (items, nextItem) => ({ ...items, [nextItem.id]: nextItem }),
          {}
        );
        const sufficientStock = order.every(
          (item) => item.qty <= entities[item.productId].stocks
        );
        return sufficientStock;
      })
    );
  }
}
