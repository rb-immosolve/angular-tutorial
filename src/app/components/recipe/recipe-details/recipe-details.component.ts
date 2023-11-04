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
  updateSubscription: Subscription

  constructor(
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const recipeId = params['id'];
      this.recipe = this.recipeService.getRecipeById(recipeId);
      if (this.recipe === undefined) {
        this.router.navigate(['../'], { relativeTo: this.route });
      }
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
