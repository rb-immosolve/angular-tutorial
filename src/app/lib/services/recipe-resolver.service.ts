import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { RecipeFirebaseConnector } from "./recipe-firebase.service";
import { Observable, tap } from "rxjs";
import { Recipe } from "src/app/model/recipe.model";
import { RecipeService } from "./recipe.service";

export const recipeResolverFn: ResolveFn<Recipe[]> = 
  (
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot,
    recipeFirebaseConnector : RecipeFirebaseConnector = inject(RecipeFirebaseConnector),
    recipeService : RecipeService = inject(RecipeService),
    ) => {
      return recipeFirebaseConnector.getAllRecipes().pipe(tap( (recipes: Recipe[]) => {
        recipeService.recipeList = recipes;
      }));
}
