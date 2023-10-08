import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Recipe } from '../../model/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit{
  @Output('recipeClick') recipeClick = new EventEmitter<Recipe>()

  recipes:Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com//content/f1/40/d07fd28b4f23954ed7ea4bcdd2af/card-overlay._TTW_._CR0,0,1080,648_.jpg'),
    new Recipe('Recipe2', 'This is simply a test', 'https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com//content/f1/40/d07fd28b4f23954ed7ea4bcdd2af/card-overlay._TTW_._CR0,0,1080,648_.jpg'),
  ];

  onRecipeClick(recipe:Recipe){
    this.recipeClick.emit(recipe)
  }

  ngOnInit(){
    if(this.recipes.length > 0){
      this.recipeClick.emit(this.recipes[0])  
    }
  }
}
