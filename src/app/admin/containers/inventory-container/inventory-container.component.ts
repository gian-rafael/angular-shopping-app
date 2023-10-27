import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Output,
  EventEmitter,
} from "@angular/core";
import { CurrencyPipe } from "@angular/common";

import { Store, select } from "@ngrx/store";

import { Observable, fromEvent, timer, iif, BehaviorSubject } from "rxjs";
import { distinctUntilChanged, map, switchMap, tap } from "rxjs/operators";

import { utils, writeFile } from "xlsx";

import { ProductsState } from "../../../product/store/reducers";
import { Product } from "../../../product/models/product";

import * as productSelectors from "../../../product/store/selectors/product.selector";
import * as productActions from "../../../product/store/actions/product.action";

@Component({
  selector: "inventory-container",
  templateUrl: "./inventory-container.component.html",
  styleUrls: ["./inventory-container.component.scss"],
  providers: [CurrencyPipe],
})
export class InventoryContainerComponent implements OnInit, AfterViewInit {
  products$: Observable<Product[]>;
  queriedProducts$: Observable<Product[]>;
  displayItems$: Observable<Product[]>;

  searching$ = new BehaviorSubject(false);

  @Output() updateProduct = new EventEmitter<Product>();

  @ViewChild("productSearch") searchInput: ElementRef<HTMLInputElement>;

  constructor(
    private store: Store<ProductsState>,
    private currencyPipe: CurrencyPipe
  ) {}

  readonly deleteModalId = "deleteProductModal";
  readonly addModalId = "addProductModal";

  get deleteModal() {
    // @ts-ignore
    return $(`#${this.deleteModalId}`);
  }

  get addModal() {
    // @ts-ignore
    return $(`#${this.addModalId}`);
  }

  itemForDelete: Product;

  readonly tableHeaders = [
    "ID",
    "Image",
    "Name",
    "Description",
    "Price",
    "Stocks",
    "Actions"
  ];

  ngOnInit() {
    this.store.dispatch(new productActions.SearchProducts(""));

    this.products$ = this.store.pipe(select(productSelectors.getProductList));
    this.queriedProducts$ = this.store.pipe(
      select(productSelectors.getQueriedProducts)
    );

    this.displayItems$ = this.searching$.pipe(
      switchMap((searching) =>
        iif(() => searching, this.queriedProducts$, this.products$)
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

  handleExport(items: Product[]) {
    const data = items.map((item) => {
      const { img: _, id, name, description, stocks, price } = item;
      return Object.values({
        id,
        name,
        description,
        stocks,
        price: this.currencyPipe.transform(price, "PHP"),
      });
    });

    const sheet = utils.aoa_to_sheet([
      ["ID", "PRODUCT NAME", "DESCRIPTION", "QUANTITY", "PRICE"],
      ...data,
    ]);

    const book = utils.book_new();
    utils.book_append_sheet(book, sheet, "Sheet 1");

    writeFile(book, "product_inventory.xlsx");
  }

  handleDeleteItem(item: Product) {
    this.itemForDelete = item;
    // @ts-ignore
    this.deleteModal.modal("show");
  }

  confirmDelete() {
    this.store.dispatch(new productActions.DeleteProduct(this.itemForDelete));
    this.closeDeleteModal();
  }

  closeDeleteModal() {
    // @ts-ignore
    this.deleteModal.modal("hide");
    this.itemForDelete = null;
  }

  handleUpdateProduct(product: Product) {
    this.updateProduct.emit(product);
  }

  handleAddProduct() {
    // @ts-ignore
    this.addModal.modal("show");
  }

  confirmAdd(product: Product) {
    this.store.dispatch(new productActions.AddProduct(product));
    // @ts-ignore
    this.addModal.modal("hide");
  }
}
