import { Component, OnInit } from "@angular/core";

import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

import * as fromProducts from "../../store/reducers";
import * as actions from "../../store/actions";
import * as selectors from "../../store/selectors";

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

  constructor(private store: Store<fromProducts.ProductsState>) {}

  ngOnInit() {
    this.store.dispatch(new actions.GetProducts());
    this.products$ = this.store.pipe(select(selectors.getProductList));
    this.isLoading$ = this.store.pipe(select(selectors.getIsLoading));
  }

  onAddToCart(request: AddToCartRequest) {
    this.store.dispatch(new actions.AddToCart(request));
  }

  onAddToWishlist(product: Product) {}
}
