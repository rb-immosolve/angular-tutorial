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
    new Recipe('A Test Recipe', 'This is simply a test', 'https://i0.wp.com/pixahive.com/wp-content/uploads/2020/09/Dragon-Ball-Zee-Paper-Art-104268-pixahive.jpg'),
    new Recipe('Recipe2', 'This is simply a test', 'https://i0.wp.com/pixahive.com/wp-content/uploads/2020/09/Dragon-Ball-Zee-Paper-Art-104268-pixahive.jpg'),
  ];

  onRecipeClick(recipe:Recipe){
    this.recipeClick.emit(recipe)
  }

  ngOnInit(){
    console.log('firstClick')
    this.recipeClick.emit(this.recipes[0])
  }
}
