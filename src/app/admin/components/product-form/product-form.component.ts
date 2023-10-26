import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.scss"],
})
export class ProductFormComponent implements OnInit {
  @Input() form: FormGroup;
  @Output() onSubmit = new EventEmitter();

  get requiredName() {
    const control = this.form.get("name");
    return control.hasError("required") && control.touched;
  }

  get requiredDescription() {
    const control = this.form.get("description");
    return control.hasError("required") && control.touched;
  }

  get requiredPrice() {
    const control = this.form.get("price");
    return control.hasError("required") && control.dirty;
  }

  get invalidPrice() {
    const control = this.form.get("price");
    return control.hasError("min") && control.dirty;
  }

  get requiredImage() {
    const control = this.form.get("image");
    return control.hasError("required") && control.dirty;
  }

  get validImageUrl() {
    const control = this.form.get("image");
    console.log(control.errors);
    return control.hasError("validUrl") && control.dirty;
  }

  get requiredStocks() {
    const control = this.form.get("stocks");
    return control.hasError("required") && control.touched;
  }

  get invalidStocks() {
    const control = this.form.get("stocks");
    return control.hasError("min") && control.dirty;
  }

  constructor() {}

  ngOnInit() {}

  handleSubmit() {
    this.onSubmit.emit();
  }
}
