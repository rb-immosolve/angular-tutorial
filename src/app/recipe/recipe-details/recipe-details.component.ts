import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RecipeService } from 'src/app/lib/services/recipe.service';
import { Recipe } from 'src/app/model/recipe.model';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipe = this.recipeService.recipeList[0]
    this.recipeService.changeActiveRecipe.subscribe((recipe: Recipe) => this.recipe = recipe);
  }
}
