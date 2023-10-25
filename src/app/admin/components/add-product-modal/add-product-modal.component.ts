import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { FormBuilder } from "@angular/forms";
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
    name: [""],
    description: [""],
    price: [0],
    image: [""],
    stocks: [0],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  handleSubmit() {
    const { image: img, ...fields } = this.form.value;
    this.onSubmit.emit({ img, ...fields });
  }
}
