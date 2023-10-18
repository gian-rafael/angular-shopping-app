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

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forFeature("products", reducers),
    EffectsModule.forFeature(effects),
    ReactiveFormsModule,
  ],
  declarations: [ProductListComponent, ProductItemComponent],
  exports: [ProductListComponent],
})
export class ProductModule {}
