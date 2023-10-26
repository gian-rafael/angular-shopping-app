import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { AbstractControl, FormBuilder, Validators } from "@angular/forms";
import { Product } from "src/app/product/models/product";

@Component({
  selector: "add-product-modal",
  templateUrl: "./add-product-modal.component.html",
  styleUrls: ["./add-product-modal.component.scss"],
})
export class AddProductModalComponent implements OnInit {
  @Input() modalId: string;
  @Output() onSubmit = new EventEmitter<Partial<Product>>();

  form = this.fb.group({
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

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  handleSubmit() {
    const { image: img, ...fields } = this.form.value;
    this.onSubmit.emit({ img, ...fields });
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
