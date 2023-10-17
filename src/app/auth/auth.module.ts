import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import * as authStore from "./store";
import { effects } from "./store/effects";

import { LoginContainerComponent } from "./containers/login-container/login-container.component";
import { RegisterContainerComponent } from "./containers/register-container/register-container.component";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  {
    path: "auth",
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "login",
      },
      {
        path: "login",
        component: LoginContainerComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "register",
        component: RegisterContainerComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    EffectsModule.forFeature(effects),
    StoreModule.forFeature("auth", authStore.reducers),
  ],
  declarations: [LoginContainerComponent, RegisterContainerComponent],
  providers: [AuthGuard],
})
export class AuthModule {}
