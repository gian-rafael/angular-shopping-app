import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AddToCartRequest } from "../components/product-item/product-item.component";

import { UserDetails } from "src/app/auth/models/user";

import { CartItem } from "../models/cart";

import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CartService {
  readonly CART_ENDPOINT = "http://localhost:3000/carts";

  constructor(private http: HttpClient) {}

  addToCart(request: { user: UserDetails; request: AddToCartRequest }) {
    const { user, request: cartItemRequest } = request;
    const cartItem: CartItem = {
      cartId: user.id,
      productId: cartItemRequest.product.id,
      qty: cartItemRequest.quantity,
      userId: user.id,
      username: user.username,
    };
    return this.http.post(this.CART_ENDPOINT, cartItem).pipe(tap(console.log));
  }
}
