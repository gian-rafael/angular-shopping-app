import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { tap, switchMap } from "rxjs/operators";

import { WishlistItem } from "../models/wishlist";

@Injectable({
  providedIn: "root",
})
export class WishlistService {
  readonly WISHLIST_ENDPOINT = "http://localhost:3000/wishlist";

  constructor(private http: HttpClient) {}

  getWishlistItems(userId: number): Observable<WishlistItem[]> {
    return this.http.get<WishlistItem[]>(
      `${this.WISHLIST_ENDPOINT}?userId=${userId}`
    );
  }

  addToWishlist(wishlistItem: WishlistItem): Observable<WishlistItem> {
    return this.getWishlistItems(wishlistItem.userId).pipe(
      switchMap((items) => {
        const existing = items.find(
          (item) => item.productId === wishlistItem.productId
        );
        if (existing) {
          throw new Error("Item already in wishlist.");
        }
        return this.http.post<WishlistItem>(
          `${this.WISHLIST_ENDPOINT}`,
          wishlistItem
        );
      })
    );
  }

  removeWishlist(wishlist: WishlistItem) {
    return this.http
      .delete(`${this.WISHLIST_ENDPOINT}/${wishlist.id}`)
  }
}
