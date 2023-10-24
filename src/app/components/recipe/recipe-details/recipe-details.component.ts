import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/lib/services/recipe.service';
import { ShoppingListService } from 'src/app/lib/services/shopping-list.service';
import { Recipe } from 'src/app/model/recipe.model';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe

  constructor(
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const recipeId = parseInt(params['id'])
      this.recipe = this.recipeService.getRecipeById(recipeId)
      if(!this.recipe){
        this.router.navigate(['']);
      }
    });
  }

  addRecipeToShoppingList() {
    this.shoppingListService.addRecipeToShoppingList(this.recipe);
  }
}
