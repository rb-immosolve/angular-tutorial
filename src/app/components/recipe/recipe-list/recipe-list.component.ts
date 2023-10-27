import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/lib/services/recipe.service';
import { Logger } from 'src/app/lib/services/logging.service';
import { Recipe } from 'src/app/model/recipe.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipeList: Recipe[]
  recipeListSubscription: Subscription;

  constructor(public recipeService: RecipeService, public logger: Logger) { }

  ngOnInit(): void {
    this.recipeList = this.recipeService.getRecipes();

    this.recipeListSubscription = this.recipeService.recipeListModification.subscribe((list) => this.recipeList = list);
  }

  ngOnDestroy(): void {
    this.recipeListSubscription.unsubscribe();
  }

}
