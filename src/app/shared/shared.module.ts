import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QuantitySelectorComponent } from "./components/quantity-selector/quantity-selector.component";

@NgModule({
  imports: [CommonModule],
  declarations: [QuantitySelectorComponent],
  exports: [QuantitySelectorComponent],
})
export class SharedModule {}
