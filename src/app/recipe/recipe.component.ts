import { Component, DoCheck } from '@angular/core';
import { Recipe } from '../model/recipe.model';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent{
  activeRecipe:Recipe

  updateRecipe(recipe: Recipe){
    this.activeRecipe = Object.assign({},recipe)

  }
}
