import { Injectable } from "@angular/core";

import { Store, select } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";

import { of } from "rxjs";
import { switchMap, map, catchError, repeat, take } from "rxjs/operators";

import * as wishlistActions from "../actions/wishlist.action";
import * as authSelectors from "../.././../auth/store/selectors/auth.selector";

import { WishlistService } from "../../services/wishlist.service";
import { AuthState } from "src/app/auth/store";
import { ToastService } from "src/app/toast.service";
import {
  ErrorMessages,
  InfoMessages,
  SuccessMessages,
} from "src/app/components/toast/toast.constants";

@Injectable()
export class WishlistEffect {
  constructor(
    private actions$: Actions,
    private wishlistService: WishlistService,
    private store: Store<AuthState>,
    private toastService: ToastService
  ) {}

  @Effect()
  getWishlistItems$ = this.actions$.pipe(
    ofType(wishlistActions.GET_WISHLIST),
    switchMap(() => this.store.pipe(select(authSelectors.getUser))),
    switchMap((user) => this.wishlistService.getWishlistItems(user.id)),
    map(
      (wishlistItems) => new wishlistActions.GetWishlistSuccess(wishlistItems)
    ),
    catchError((error) => of(new wishlistActions.GetWishlistFail(error))),
    repeat()
  );

  @Effect()
  addWishlist$ = this.actions$.pipe(
    ofType(wishlistActions.ADD_WISHLIST),
    switchMap(({ payload }: wishlistActions.AddWishlist) =>
      this.store.pipe(
        select(authSelectors.getUser),
        take(1),
        switchMap((user) =>
          this.wishlistService.addToWishlist({
            productId: payload.id,
            userId: user.id,
            username: user.username,
          })
        )
      )
    ),
    map((wishlistItem) => {
      this.toastService.showToast(SuccessMessages.addToWishlist);
      return new wishlistActions.AddWishlistSuccess(wishlistItem);
    }),
    catchError((error) => {
      this.toastService.showToast(ErrorMessages.customError(error.message));
      return of(new wishlistActions.AddWishlistFail(error));
    }),
    repeat()
  );

  @Effect()
  removeWishlistItem$ = this.actions$.pipe(
    ofType(wishlistActions.REMOVE_WISHLIST),
    switchMap((action: wishlistActions.RemoveWishlist) =>
      this.wishlistService.removeWishlist(action.payload).pipe(
        map(() => {
          this.toastService.showToast(InfoMessages.removeFromWishlist);
          return new wishlistActions.RemoveWishlistSuccess(action.payload);
        }),
        catchError((error) => {
          this.toastService.showToast(ErrorMessages.customError(error.message));
          return of(new wishlistActions.RemoveWishlistFail(error));
        })
      )
    )
  );
}
