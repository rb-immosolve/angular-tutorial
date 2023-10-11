import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Recipe } from '../../model/recipe.model';
import { RecipeService } from 'src/app/lib/services/recipe.service';
import { Logger } from 'src/app/lib/services/logging.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {

  constructor(public recipeService: RecipeService, public logger: Logger) { }

}
