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
    path: "auth",
    loadChildren: () => AuthModule,
  },
];

@NgModule({
  declarations: [AppComponent, NavbarComponent, HomePageComponent],
  imports: [
    /** Angular Modules */
    BrowserModule,
    RouterModule.forRoot(routes),

    /** Ngrx Modules */
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument(),

    /** Custom Modules */
    AuthModule,
    ProductModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
