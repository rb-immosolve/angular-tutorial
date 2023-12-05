import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "src/app/components/auth/auth.component";
import { ShoppingListComponent } from "src/app/components/shopping/shopping-list/shopping-list.component";

const routes: Routes = [
  { path: '', component: AuthComponent, resolve: { autoLogin: 'userAutologinFn' } },
  { path: 'shopping-list', component: ShoppingListComponent, canActivate: ['authGuard'] },
  { path: 'auth', component: AuthComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouteModule {

}