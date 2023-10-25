import { Component, OnInit } from "@angular/core";

import { Store, select } from "@ngrx/store";

import { Observable } from "rxjs";

import { ProductsState } from "../../store/reducers";
import { WishlistItemDetailed } from "../../models/wishlist";

import * as wishlistActions from "../../store/actions/wishlist.action";
import * as wishlistSelectors from "../../store/selectors/wishlist.selector";
import * as cartActions from "../../store/actions/cart.action";

import { Product } from "../../models/product";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "wishlist",
  templateUrl: "./wishlist.component.html",
  styleUrls: ["./wishlist.component.scss"],
})
export class WishlistComponent implements OnInit {
  wishlist$: Observable<WishlistItemDetailed[]>;
  loading$: Observable<boolean>;

  readonly modalId = "addToCartModal";

  selectedProduct: Product;

  form = this.fb.group({
    quantity: [1],
  });

  get itemQuantity() {
    const control = this.form.get("quantity");
    return control.value;
  }

  get addToCartModal() {
    // @ts-ignore
    return $(`#${this.modalId}`);
  }

  constructor(private fb: FormBuilder, private store: Store<ProductsState>) {}

  ngOnInit() {
    this.store.dispatch(new wishlistActions.GetWishlist());
    this.wishlist$ = this.store.pipe(
      select(wishlistSelectors.getWishlistItemsDetailed)
    );
    this.loading$ = this.store.pipe(select(wishlistSelectors.getIsLoading))
  }

  handleRemove(wishlistItem: WishlistItemDetailed) {
    this.store.dispatch(new wishlistActions.RemoveWishlist(wishlistItem));
  }

  showAddToCartModal(product: Product) {
    this.selectedProduct = product;
    // @ts-ignore
    this.addToCartModal.modal("show");
  }

  handleAddToCart() {
    const { quantity } = this.form.value;
    this.store.dispatch(
      new cartActions.AddToCart({ product: this.selectedProduct, quantity })
    );
    // @ts-ignore
    this.addToCartModal.modal("hide");
    this.selectedProduct = null;
    this.form.reset({ quantity: 1 });
  }
}
