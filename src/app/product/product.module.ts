import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { effects } from "./store/effects";
import { reducers } from "./store/reducers";
import { ProductListComponent } from "./containers/product-list/product-list.component";
import { ProductItemComponent } from "./components/product-item/product-item.component";
import { SharedModule } from "../shared/shared.module";
import { CartItemsComponent } from "./containers/cart-items/cart-items.component";
import { CartItemComponent } from "./components/cart-item/cart-item.component";
import { guards } from "./guards";
import { WishlistComponent } from './containers/wishlist/wishlist.component';
import { WishlistItemComponent } from './components/wishlist-item/wishlist-item.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forFeature("products", reducers),
    EffectsModule.forFeature(effects),
    ReactiveFormsModule,
  ],
  declarations: [
    ProductListComponent,
    ProductItemComponent,
    CartItemsComponent,
    CartItemComponent,
    WishlistComponent,
    WishlistItemComponent,
  ],
  providers: [...guards],
  exports: [ProductListComponent, CartItemsComponent, WishlistComponent],
})
export class ProductModule {}
