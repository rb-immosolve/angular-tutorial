import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "src/app/components/auth/auth.component";
import { RecipeDetailsComponent } from "src/app/components/recipe/recipe-details/recipe-details.component";
import { RecipeHomeComponent } from "src/app/components/recipe/recipe-home/recipe-home.component";
import { RecipeUpsertComponent } from "src/app/components/recipe/recipe-upsert/recipe-upsert.component";
import { RecipeComponent } from "src/app/components/recipe/recipe.component";
import { ShoppingListComponent } from "src/app/components/shopping/shopping-list/shopping-list.component";

const routes: Routes = [
  { path: '', component: AuthComponent, resolve: { autoLogin: 'userAutologinFn' } },
  {
    path: 'recipe', component: RecipeComponent, resolve: { recipes: 'recipeResolverFn' }, canActivate: ['authGuard'], children: [
      { path: '', component: RecipeHomeComponent },
      { path: 'add', component: RecipeUpsertComponent },
      { path: ':id', component: RecipeDetailsComponent },
      { path: ':id/edit', component: RecipeUpsertComponent },
    ],
  },
  { path: 'shopping-list', component: ShoppingListComponent, canActivate: ['authGuard'] },
  { path: 'auth', component: AuthComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouteModule {

}