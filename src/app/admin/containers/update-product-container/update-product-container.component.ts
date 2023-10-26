import { Component, OnInit, Input } from "@angular/core";

import { Observable } from "rxjs";
import { take } from "rxjs/operators";

import { Store, select } from "@ngrx/store";

import { ProductState } from "../../../product/store/reducers/product.reducer";
import * as productSelectors from "../../../product/store/selectors/product.selector";
import * as productActions from "../../../product/store/actions/product.action";

import { Product } from "src/app/product/models/product";
import {
  AbstractControl,
  FormBuilder,
  Validators,
} from "@angular/forms";

@Component({
  selector: "update-product-container",
  templateUrl: "./update-product-container.component.html",
  styleUrls: ["./update-product-container.component.scss"],
})
export class UpdateProductContainerComponent implements OnInit {
  @Input() productId: number;

  product$: Observable<Product>;

  form = this.fb.group({
    id: [],
    name: ["", [Validators.required]],
    description: ["", [Validators.required]],
    price: [
      0,
      [Validators.required, Validators.min(0), Validators.pattern(/\d+/)],
    ],
    image: ["", [Validators.required, this.validUrl]],
    stocks: [
      0,
      [Validators.required, Validators.min(0), Validators.pattern(/\d+/)],
    ],
  });

  constructor(private store: Store<ProductState>, private fb: FormBuilder) {}

  ngOnInit() {
    this.product$ = this.store.pipe(
      select(productSelectors.getSelectedProduct, { id: this.productId })
    );
    this.product$
      .pipe(take(1))
      .subscribe(({ img: image, ...product }: Product) => {
        this.form.setValue({
          ...product,
          image,
        });
      });
  }

  handleSubmit() {
    const { image: img, ...product } = this.form.value;
    this.store.dispatch(new productActions.UpdateProduct({ ...product, img }));
  }

  validUrl(control: AbstractControl) {
    const value = control.value;
    try {
      new URL(value);
      return null;
    } catch (_) {
      return { validUrl: true };
    }
  }
}
