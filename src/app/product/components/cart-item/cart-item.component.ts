import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CartItem, CartItemDetailed } from "../../models/cart";
import { Product } from "../../models/product";

@Component({
  selector: "cart-item",
  templateUrl: "./cart-item.component.html",
  styleUrls: ["./cart-item.component.scss"],
})
export class CartItemComponent implements OnInit {
  @Input() cartItem: CartItemDetailed;
  @Output() removeFromCart: EventEmitter<CartItemDetailed> = new EventEmitter();
  @Output() addToWishlist: EventEmitter<CartItemDetailed> = new EventEmitter();
  @Output() itemSelect: EventEmitter<number> = new EventEmitter();
  @Output() quantityIncrement: EventEmitter<CartItem> = new EventEmitter();
  @Output() quantityDecrement: EventEmitter<CartItem> = new EventEmitter();

  truncatedDescription: boolean;
  expandDescription = false;

  get description() {
    const productDescription = this.product.description;
    if (productDescription.length > 100 && !this.expandDescription) {
      return productDescription.substring(0, 100) + "...";
    }
    return productDescription;
  }

  get itemQuantity() {
    return this.cartItem.qty;
  }

  get product(): Product {
    return this.cartItem.product;
  }

  get isSoldOut(): boolean {
    return this.cartItem.product.stocks <= 0;
  }

  get qtyError(): boolean {
    return this.cartItem.qty > this.cartItem.product.stocks;
  }

  @Input() selected = false;

  constructor() {}

  ngOnInit() {
    this.truncatedDescription = this.product.description.length > 100;
  }

  onToggleSelect() {
    if (this.qtyError || this.isSoldOut) return;
    this.itemSelect.emit(this.cartItem.id);
  }

  onRemoveFromCart(event: Event) {
    event.stopPropagation();
    this.removeFromCart.emit(this.cartItem);
  }

  _handleIncrement(value: number) {
    const { product, ...cartItem } = this.cartItem;
    this.quantityIncrement.emit({ ...cartItem, qty: value });
  }

  get handleIncrement() {
    return this._handleIncrement.bind(this);
  }

  _handleDecrement(value: number) {
    const { product, ...cartItem } = this.cartItem;
    this.quantityIncrement.emit({ ...cartItem, qty: value });
  }

  get handleDecrement() {
    return this._handleDecrement.bind(this);
  }

  onAddToWishlist(event: Event) {
    event.stopPropagation();
    this.addToWishlist.emit(this.cartItem);
  }

  onExpandDescription(event: Event) {
    event.stopPropagation();
    this.expandDescription = !this.expandDescription;
  }
}
