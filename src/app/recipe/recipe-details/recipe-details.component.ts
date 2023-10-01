import { Component, DoCheck, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Recipe } from 'src/app/model/recipe.model';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent{
  @Input('recipeItem') recipe:Recipe

}
