import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Product } from "src/app/product/models/product";

@Component({
  selector: "app-inventory-page",
  templateUrl: "./inventory-page.component.html",
  styleUrls: ["./inventory-page.component.scss"],
})
export class InventoryPageComponent {
  constructor(private router: Router) {}

  handleUpdate(product: Product) {
    this.router.navigate(["product", product.id]);
  }
}
