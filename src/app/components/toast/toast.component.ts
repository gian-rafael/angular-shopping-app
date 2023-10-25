import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ToastContent, ToastService } from "src/app/toast.service";

@Component({
  selector: "toast",
  templateUrl: "./toast.component.html",
  styleUrls: ["./toast.component.scss"],
})
export class ToastComponent implements OnInit {
  toastData$: Observable<ToastContent>;

  toastId: string;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastData$ = this.toastService.toastData;
    this.toastId = this.toastService.TOAST_ID;
  }
}
