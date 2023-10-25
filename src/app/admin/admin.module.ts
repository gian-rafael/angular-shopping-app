import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { reducers } from "./store/reducers";

import { SalesContainerComponent } from "./containers/sales-container/sales-container.component";
import { InventoryContainerComponent } from "./containers/inventory-container/inventory-container.component";

import { guards } from "./guards";
import { effects } from "./store/effects";
import { ProductFormComponent } from "./components/product-form/product-form.component";
import { ImageViewerComponent } from "./components/image-viewer/image-viewer.component";
import { UpdateProductContainerComponent } from "./containers/update-product-container/update-product-container.component";
import { AddProductModalComponent } from './components/add-product-modal/add-product-modal.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forFeature("admin", reducers),
    EffectsModule.forFeature(effects),
  ],
  declarations: [
    SalesContainerComponent,
    InventoryContainerComponent,
    ProductFormComponent,
    ImageViewerComponent,
    UpdateProductContainerComponent,
    AddProductModalComponent,
  ],
  providers: [...guards],
  exports: [
    SalesContainerComponent,
    InventoryContainerComponent,
    UpdateProductContainerComponent,
  ],
})
export class AdminModule {}
