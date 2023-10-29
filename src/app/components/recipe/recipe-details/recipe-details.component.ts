import { Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from 'src/app/lib/services/recipe.service';
import { ShoppingListService } from 'src/app/lib/services/shopping-list.service';
import { Recipe } from 'src/app/model/recipe.model';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  initRecipeId: string;
  updateSubscription: Subscription

  constructor(
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initRecipeId = this.route.snapshot.params['id'];
    if (this.recipeService.firstFetchComplete == false) {
      this.updateSubscription = this.recipeService.recipeListModification.subscribe(() => {
        this.recipe = this.recipeService.getRecipeById(this.initRecipeId);
      })
    } else {
      this.recipe = this.recipeService.recipeList[0];
    }
    this.route.params.subscribe(async (params: Params) => {
      const recipeId = params['id'];
      this.recipe = this.recipeService.getRecipeById(recipeId);
    });
  }

  ngOnDestroy(): void {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

  addRecipeToShoppingList() {
    this.shoppingListService.addRecipeToShoppingList(this.recipe);
  }

  deleteRecipe() {
    this.recipeService.removeRecipeByRecipe(this.recipe);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
