import { Component, OnInit } from "@angular/core";

import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import * as fromProducts from "../../store/reducers";
import * as actions from "../../store/actions";
import * as selectors from "../../store/selectors/product.selector";

import * as fromAuth from "../../../auth/store/reducers";
import * as authSelectors from "../../../auth/store/selectors/auth.selector";

import { Product } from "../../models/product";
import { AddToCartRequest } from "../../components/product-item/product-item.component";

@Component({
  selector: "product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  isLoading$: Observable<boolean>;
  preview$: Observable<boolean>;

  constructor(
    private store: Store<fromProducts.ProductsState>,
    private authStore: Store<fromAuth.AuthState>
  ) {}

  ngOnInit() {
    this.store.dispatch(new actions.GetProducts());
    this.products$ = this.store.pipe(select(selectors.getProductList));
    this.isLoading$ = this.store.pipe(select(selectors.getIsLoading));
    this.preview$ = this.authStore.pipe(
      select(authSelectors.getUserRole),
      map((role) => role === "admin")
    );
  }

  onAddToCart(request: AddToCartRequest) {
    this.store.dispatch(new actions.AddToCart(request));
  }

  onAddToWishlist(product: Product) {
    this.store.dispatch(new actions.AddWishlist(product));
  }
}
