import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { CurrencyPipe } from "@angular/common";

import { Store, select } from "@ngrx/store";

import { utils, writeFile } from "xlsx";

import { Observable, fromEvent, timer, BehaviorSubject, iif } from "rxjs";
import { distinctUntilChanged, switchMap, tap, map } from "rxjs/operators";

import { ProductWithSales } from "src/app/product/models/product";
import { ProductState } from "src/app/product/store/reducers/product.reducer";

import * as productSelectors from "../../../product/store/selectors/product.selector";
import * as productActions from "../../../product/store/actions/product.action";

@Component({
  selector: "sales-container",
  templateUrl: "./sales-container.component.html",
  styleUrls: ["./sales-container.component.scss"],
  providers: [CurrencyPipe],
})
export class SalesContainerComponent implements OnInit, AfterViewInit {
  sales$: Observable<ProductWithSales[]>;
  queriedSales$: Observable<ProductWithSales[]>;
  displayItems$: Observable<ProductWithSales[]>;

  searching$ = new BehaviorSubject(false);

  @ViewChild("productSearch") searchInput: ElementRef<HTMLInputElement>;

  constructor(
    private store: Store<ProductState>,
    private currencyPipe: CurrencyPipe
  ) {}

  readonly tableHeaders = ["ID", "Name", "Price", "Stocks", "Sold", "Total"];

  ngOnInit() {
    this.store.dispatch(new productActions.SearchProducts(""));
    
    this.sales$ = this.store.pipe(
      select(productSelectors.getProductListWithSales)
    );
    this.queriedSales$ = this.store.pipe(
      select(productSelectors.getQueriedProductListWithSales)
    );

    this.displayItems$ = this.searching$.pipe(
      switchMap((searching) =>
        iif(() => searching, this.queriedSales$, this.sales$)
      )
    );
  }

  ngAfterViewInit() {
    fromEvent(this.searchInput.nativeElement, "keyup")
      .pipe(
        map((event) => (event.target as HTMLInputElement).value.trim()),
        distinctUntilChanged(),
        switchMap((value) =>
          timer(500).pipe(
            tap(() => {
              this.store.dispatch(new productActions.SearchProducts(value));
            }),
            map(() => value)
          )
        )
      )
      .subscribe((val) => {
        this.searching$.next(val !== "");
      });
  }

  handleExport(items: ProductWithSales[]) {
    const data = items.map((item) => {
      const { id, name, price, sold, total } = item;
      return Object.values({
        id,
        name,
        price: this.currencyPipe.transform(price, "PHP"),
        sold,
        total: this.currencyPipe.transform(total, "PHP"),
      });
    });

    const sheet = utils.aoa_to_sheet([
      ["ID", "PRODUCT NAME", "PRICE", "SOLD", "TOTAL"],
      ...data,
    ]);

    const book = utils.book_new();
    utils.book_append_sheet(book, sheet, "Sheet 1");

    writeFile(book, "product_sales.xlsx");
  }
}
