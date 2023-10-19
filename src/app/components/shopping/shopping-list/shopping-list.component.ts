import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../../model/ingredient.model';
import { ShoppingListService } from 'src/app/lib/services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [];
  errMsg: string = "";

  constructor(private shoppingListService: ShoppingListService) { }

  addIngredient(ingredient: Ingredient) {
    this.errMsg = this.shoppingListService.addIngredientToShoppingList(ingredient);
  }

  removeIngredient(ingredient: Ingredient) {
    this.errMsg = this.shoppingListService.removeIngredientFromShoppingList(ingredient);
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.shoppingList
  }

}
