import { Component, Input, forwardRef } from "@angular/core";

import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

@Component({
  selector: "quantity-selector",
  templateUrl: "./quantity-selector.component.html",
  styleUrls: ["./quantity-selector.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuantitySelectorComponent),
      multi: true,
    },
  ],
})
export class QuantitySelectorComponent implements ControlValueAccessor {
  constructor() {}

  @Input() max: number;
  @Input() min: number = 1;
  @Input() isSoldOut: boolean = false;

  value: number = this.min;

  onChange: Function;
  onTouched: Function;

  get disabledIncrement() {
    return this.isSoldOut || (this.max && this.value + 1 > this.max);
  }

  get disabledDecrement() {
    return this.isSoldOut || this.value - 1 < this.min;
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  increment() {
    this.value += 1;
    this.onChange(this.value);
    this.onTouched();
  }

  decrement() {
    this.value -= 1;
    this.onChange(this.value);
    this.onTouched();
  }
}
