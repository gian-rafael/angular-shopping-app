import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { Transaction } from "../../product/models/transaction";

@Injectable({
  providedIn: "root",
})
export class TransactionService {
  readonly TRANSACTION_ENDPOINT = "http://localhost:3000/transactions";

  constructor(private http: HttpClient) {}

  getTransasctions(): Observable<Transaction[]> {
    return this.http
      .get<Transaction[]>(this.TRANSACTION_ENDPOINT)
  }
}
