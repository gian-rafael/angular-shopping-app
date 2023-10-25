import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import { Product } from "../models/product";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  readonly PRODUCTS_ENDPOINT = "http://localhost:3000/products";

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.PRODUCTS_ENDPOINT);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.PRODUCTS_ENDPOINT, product);
  }

  updateProduct(product: Product) {
    return this.http.put(`${this.PRODUCTS_ENDPOINT}/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.PRODUCTS_ENDPOINT}/${id}`);
  }
}
