import { RouterModule, Routes } from "@angular/router";
import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";
import { RecipeHomeComponent } from "./recipe-home/recipe-home.component";
import { RecipeUpsertComponent } from "./recipe-upsert/recipe-upsert.component";
import { RecipeComponent } from "./recipe.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: 'recipe', component: RecipeComponent, resolve: { recipes: 'recipeResolverFn' }, canActivate: ['authGuard'], children: [
      { path: '', component: RecipeHomeComponent },
      { path: 'add', component: RecipeUpsertComponent },
      { path: ':id', component: RecipeDetailsComponent },
      { path: ':id/edit', component: RecipeUpsertComponent },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutesModule {}