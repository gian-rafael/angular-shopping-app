import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { AppComponent } from "./app.component";

import { AuthModule } from "./auth/auth.module";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ProductModule } from "./product/product.module";

import { HomePageComponent } from "./pages/home-page/home-page.component";
import { CartPageComponent } from "./pages/cart-page/cart-page.component";
import { WishlistPageComponent } from "./pages/wishlist-page/wishlist-page.component";

import * as productGuards from "./product/guards";
import * as authGuards from "./auth/guards";
import * as adminGuards from "./admin/guards";

import { LOGOUT } from "./auth/store/actions";
import * as fromCartReducer from "./product/store/reducers/cart.reducer";
import * as fromWishlistReducer from "./product/store/reducers/wishlist.reducer";
import * as fromTransactionReducer from "./admin/store/reducers/transaction.reducer";

import { SalesPageComponent } from "./pages/sales-page/sales-page.component";
import { InventoryPageComponent } from "./pages/inventory-page/inventory-page.component";
import { AdminModule } from "./admin/admin.module";
import { UpdateProductPageComponent } from "./pages/update-product-page/update-product-page.component";
import { ToastComponent } from './components/toast/toast.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
  },
  {
    path: "home",
    component: HomePageComponent,
  },
  {
    path: "cart",
    component: CartPageComponent,
    canActivate: [authGuards.UserLoggedInGuard, productGuards.CartGuard],
  },
  {
    path: "wishlist",
    component: WishlistPageComponent,
    canActivate: [authGuards.UserLoggedInGuard, productGuards.CartGuard],
  },
  {
    path: "inventory",
    component: InventoryPageComponent,
    canActivate: [
      authGuards.UserLoggedInGuard,
      authGuards.IsAdminGuard,
      adminGuards.InventoryGuard,
    ],
  },
  {
    path: "sales",
    component: SalesPageComponent,
    canActivate: [
      authGuards.UserLoggedInGuard,
      authGuards.IsAdminGuard,
      adminGuards.SalesGuard,
    ],
  },
  {
    path: "product/:id",
    component: UpdateProductPageComponent,
    canActivate: [
      authGuards.UserLoggedInGuard,
      authGuards.IsAdminGuard,
      adminGuards.UpdateProductGuard,
    ],
  },
  {
    path: "auth",
    loadChildren: () => AuthModule,
  },
  {
    path: "**",
    redirectTo: "/home",
  },
];

function logout(reducer) {
  return function (state, action) {
    if (action.type === LOGOUT) {
      return reducer(
        {
          ...state,
          products: {
            ...state.products,
            cart: fromCartReducer.initialState,
            wishlist: fromWishlistReducer.initialState,
          },
          admin: {
            transactions: fromTransactionReducer.initialState,
          },
        },
        action
      );
    }
    return reducer(state, action);
  };
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    CartPageComponent,
    WishlistPageComponent,
    SalesPageComponent,
    InventoryPageComponent,
    UpdateProductPageComponent,
    ToastComponent,
  ],
  imports: [
    /** Angular Modules */
    BrowserModule,
    RouterModule.forRoot(routes),

    /** Ngrx Modules */
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}, { metaReducers: [logout] }),
    StoreDevtoolsModule.instrument(),

    /** Custom Modules */
    AuthModule,
    ProductModule,
    AdminModule,
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
