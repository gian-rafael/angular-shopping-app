import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

export interface ToastContent {
  title: string;
  description: string;
  type: string;
}

@Injectable({
  providedIn: "root",
})
export class ToastService {
  readonly TOAST_ID = "app-toast";

  private _toastData = new BehaviorSubject<ToastContent>({
    description: "",
    title: "",
    type: "",
  });

  private get toast() {
    // @ts-ignore
    return $(`#${this.TOAST_ID}`);
  }

  get toastData(): Observable<ToastContent> {
    return this._toastData.asObservable();
  }

  constructor() {}

  showToast(toastContent: ToastContent) {
    this._toastData.next(toastContent);

    // @ts-ignore
    this.toast.toast("show");
  }
}
