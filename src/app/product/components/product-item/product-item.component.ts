import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { Product } from "../../models/product";
import { FormBuilder } from "@angular/forms";
import { AddToCartRequest } from "../../models/cart";
import { BehaviorSubject, Observable } from "rxjs";

@Component({
  selector: "product-item",
  templateUrl: "./product-item.component.html",
  styleUrls: ["./product-item.component.scss"],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  @Output() addToCart = new EventEmitter<AddToCartRequest>();
  @Output() addToWishlist = new EventEmitter<Product>();

  expandDescription: boolean = false;

  truncatedDescription$: Observable<boolean>;

  form = this.fb.group({
    quantity: [1],
  });

  get isSoldOut() {
    return this.product.stocks <= 0;
  }

  get description() {
    if (this.product.description.length > 50 && !this.expandDescription) {
      return this.product.description.substring(0, 50) + "...";
    }
    return this.product.description;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.truncatedDescription$ = new BehaviorSubject<boolean>(
      this.product.description.length > 50
    );
  }

  onAddToCart() {
    const quantity = this.form.get("quantity").value || 0;

    const item: AddToCartRequest = {
      product: this.product,
      quantity,
    };

    this.addToCart.emit(item);
  }

  onAddToWishlist() {
    this.addToWishlist.emit(this.product);
  }

  onExpandDescription() {
    this.expandDescription = !this.expandDescription;
  }
}
