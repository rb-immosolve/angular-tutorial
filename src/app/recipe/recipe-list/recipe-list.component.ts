import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  recipes:Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://i0.wp.com/pixahive.com/wp-content/uploads/2020/09/Dragon-Ball-Zee-Paper-Art-104268-pixahive.jpg'),
    new Recipe('A Test Recipe', 'This is simply a test', 'https://i0.wp.com/pixahive.com/wp-content/uploads/2020/09/Dragon-Ball-Zee-Paper-Art-104268-pixahive.jpg'),
    new Recipe('A Test Recipe', 'This is simply a test', 'https://i0.wp.com/pixahive.com/wp-content/uploads/2020/09/Dragon-Ball-Zee-Paper-Art-104268-pixahive.jpg'),
    new Recipe('A Test Recipe', 'This is simply a test', 'https://i0.wp.com/pixahive.com/wp-content/uploads/2020/09/Dragon-Ball-Zee-Paper-Art-104268-pixahive.jpg'),
    new Recipe('A Test Recipe', 'This is simply a test', 'https://i0.wp.com/pixahive.com/wp-content/uploads/2020/09/Dragon-Ball-Zee-Paper-Art-104268-pixahive.jpg'),
    new Recipe('A Test Recipe', 'This is simply a test', 'https://i0.wp.com/pixahive.com/wp-content/uploads/2020/09/Dragon-Ball-Zee-Paper-Art-104268-pixahive.jpg'),
    new Recipe('A Test Recipe', 'This is simply a test', 'https://i0.wp.com/pixahive.com/wp-content/uploads/2020/09/Dragon-Ball-Zee-Paper-Art-104268-pixahive.jpg'),
    new Recipe('A Test Recipe', 'This is simply a test', 'https://i0.wp.com/pixahive.com/wp-content/uploads/2020/09/Dragon-Ball-Zee-Paper-Art-104268-pixahive.jpg'),
  ];
}
