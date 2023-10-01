import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from 'src/app/model/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input('recipe') recipe:Recipe
  @Output('recipeClick') recipeClick = new EventEmitter<Recipe>()

  showRecipeDetails(){
    this.recipeClick.emit(this.recipe)
  }

}
