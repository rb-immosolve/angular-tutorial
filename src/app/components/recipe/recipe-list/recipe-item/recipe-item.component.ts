import { Component, Input } from '@angular/core';
import { RecipeService } from 'src/app/lib/services/recipe.service';
import { Recipe } from 'src/app/model/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipe: Recipe

  constructor(public recipeService: RecipeService) { }

  format(s:string){
    if(s.length > 40){
      s = s.substring(0,40)+"..."
    }
    return s;
  }

}
