import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { WishlistItemDetailed } from "../../models/wishlist";
import { Product } from "../../models/product";

@Component({
  selector: "wishlist-item",
  templateUrl: "./wishlist-item.component.html",
  styleUrls: ["./wishlist-item.component.scss"],
})
export class WishlistItemComponent implements OnInit {
  @Input() wishlistItem: WishlistItemDetailed;

  @Output() remove: EventEmitter<WishlistItemDetailed> = new EventEmitter();
  @Output() addToCart: EventEmitter<Product> = new EventEmitter();

  truncatedDescription: boolean;
  expandDescription = false;

  get description() {
    const productDescription = this.product.description;
    if (productDescription.length > 100 && !this.expandDescription) {
      return productDescription.substring(0, 100) + "...";
    }
    return productDescription;
  }

  get product(): Product {
    return this.wishlistItem.product;
  }

  get isOutOfStock() {
    return this.product.stocks === 0;
  }

  constructor() {}

  ngOnInit() {
    this.truncatedDescription = this.product.description.length > 100;
  }

  onRemoveFromWishlist() {
    this.remove.emit(this.wishlistItem);
  }

  onAddToCart() {
    this.addToCart.emit(this.product);
  }

  onExpandDescription() {
    this.expandDescription = !this.expandDescription;
  }
}
