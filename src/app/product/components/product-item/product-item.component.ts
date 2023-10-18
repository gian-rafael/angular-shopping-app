import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { Product } from "../../models/product";
import { FormBuilder } from "@angular/forms";

export interface AddToCartRequest {
  product: Product;
  quantity: number;
}

@Component({
  selector: "product-item",
  templateUrl: "./product-item.component.html",
  styleUrls: ["./product-item.component.scss"],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  @Output() addToCart = new EventEmitter<AddToCartRequest>();
  @Output() addToWishlist = new EventEmitter<Product>();

  form = this.fb.group({
    quantity: [1],
  });

  get isSoldOut() {
    return this.product.stocks === 0;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form.valueChanges.subscribe(console.log);
  }

  onAddToCart() {
    const quantity = this.form.get("quantity").value || 0;

    const item: AddToCartRequest = {
      product: this.product,
      quantity,
    };

    console.log(item);

    this.addToCart.emit(item);
  }

  onAddToWishlist() {
    this.addToWishlist.emit(this.product);
  }
}
