import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from 'src/app/lib/services/recipe.service';
import { Recipe } from 'src/app/model/recipe.model';

@Component({
  selector: 'app-recipe-upsert',
  templateUrl: './recipe-upsert.component.html',
  styleUrls: ['./recipe-upsert.component.scss']
})
export class RecipeUpsertComponent implements OnInit {
  recipe: Recipe;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let id = params['id']
      if (id === undefined) {
        id = this.recipeService.generateNextId();
        this.recipe = new Recipe(id, '', '', '', []);
      } else {
        this.recipe = this.recipeService.getRecipeById(+id);
      }
    });
  }
}
