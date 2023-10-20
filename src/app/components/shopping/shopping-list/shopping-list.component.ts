import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../../model/ingredient.model';
import { ShoppingListService } from 'src/app/lib/services/shopping-list.service';
import { IngredientService } from 'src/app/lib/services/ingredient.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [];
  errMsg: string = "";

  constructor(private shoppingListService: ShoppingListService, private ingredientService: IngredientService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.shoppingList;
    this.ingredientService.errSubject.subscribe((errMsg: string) => {
      this.errMsg = errMsg
    })
  }

}
