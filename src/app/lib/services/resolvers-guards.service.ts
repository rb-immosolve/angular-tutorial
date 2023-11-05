import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, ResolveFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { RecipeFirebaseConnector } from "./recipe-firebase.service";
import { Observable, map, take, tap } from "rxjs";
import { Recipe } from "src/app/model/recipe.model";
import { RecipeService } from "./recipe.service";
import { AuthService } from "./auth.service";

export const recipeResolver: ResolveFn<Recipe[]> =
  (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    recipeFirebaseConnector: RecipeFirebaseConnector = inject(RecipeFirebaseConnector),
    recipeService: RecipeService = inject(RecipeService),
  ) => {
    return recipeFirebaseConnector.getAllRecipes().pipe(tap((recipes: Recipe[]) => {
      recipeService.recipeList = recipes;
    }));
  };

export const userAutologin: ResolveFn<boolean> =
  (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    authService: AuthService = inject(AuthService),
  ) => {
    authService.autoLogin();
    return true;
  }

export const authGuard: CanActivateFn =
  (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    authService: AuthService = inject(AuthService),
    router: Router = inject(Router)
  ): Observable<boolean | UrlTree> => {
    return authService.userSubject.pipe(take(1), map((user) => {
      if (!!user) return true;
      return router.createUrlTree(['/auth']);
    }));
  }