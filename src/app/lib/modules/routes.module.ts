import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeDetailsComponent } from "src/app/components/recipe/recipe-details/recipe-details.component";
import { RecipeHomeComponent } from "src/app/components/recipe/recipe-home/recipe-home.component";
import { RecipeUpsertComponent } from "src/app/components/recipe/recipe-upsert/recipe-upsert.component";
import { RecipeComponent } from "src/app/components/recipe/recipe.component";
import { ShoppingListComponent } from "src/app/components/shopping/shopping-list/shopping-list.component";

const routes: Routes = [
  { path: '', redirectTo: '/recipe', pathMatch: 'full' },
  {
    path: 'recipe', component: RecipeComponent, children: [
      { path: '', component: RecipeHomeComponent },
      { path: 'add', component: RecipeUpsertComponent },
      { path: 'edit/:id', component: RecipeUpsertComponent },
      { path: ':id', component: RecipeDetailsComponent },
    ]
  },
  { path: 'shopping-list', component: ShoppingListComponent }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouteModule {

}