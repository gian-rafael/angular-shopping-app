import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { AppComponent } from "./app.component";

import { AuthModule } from "./auth/auth.module";
import { NavbarComponent } from "./components/navbar/navbar.component";

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => AuthModule,
  },
];

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    /** Angular Modules */
    BrowserModule,
    RouterModule.forRoot(routes),

    EffectsModule.forRoot([]),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument(),
    AuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
