import { Component } from '@angular/core';
import { UNITS, Unit, Ingredient } from '../../../model/ingredient.model';
import { ShoppingListService } from 'src/app/lib/services/shopping-list.service';
import { IngredientService } from 'src/app/lib/services/ingredient.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent {

  constructor(private shoppingListService: ShoppingListService, private ingredientService: IngredientService) { }

  units = UNITS
  name: string = ""
  amount: number = 0
  unit: Unit = "pcs"

  addIngredient() {
    const errMsg: string = this.shoppingListService.addIngredientToShoppingList(new Ingredient(this.name, this.amount, this.unit))
    this.ingredientService.emit(errMsg)
    this.clear()
  }

  deleteIngredient() {
    const errMsg: string = this.shoppingListService.removeIngredientFromShoppingList(new Ingredient(this.name, this.amount, this.unit))
    this.ingredientService.emit(errMsg)
    this.clear()
  }

  clear() {
    this.name = ""
    this.amount = 0
    this.unit = "pcs"
  }
}
