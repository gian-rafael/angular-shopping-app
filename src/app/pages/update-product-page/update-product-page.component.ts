import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { pluck } from "rxjs/operators";

@Component({
  selector: "app-update-product-page",
  templateUrl: "./update-product-page.component.html",
  styleUrls: ["./update-product-page.component.scss"],
})
export class UpdateProductPageComponent {
  productId$ = this.route.params.pipe(pluck("id"));

  constructor(private route: ActivatedRoute) {}
}
