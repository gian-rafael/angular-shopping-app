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

  constructor() {}

  ngOnInit() {}

  handleSubmit() {
    this.onSubmit.emit();
  }
}
