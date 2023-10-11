import { AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import { Recipe } from '../model/recipe.model';
import { RecipeService } from '../lib/services/recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent {
  activeRecipe: Recipe

  constructor(public recipeService: RecipeService) { }

  updateRecipe(recipe: Recipe) {
    this.activeRecipe = Object.assign({}, recipe)
  }
}
