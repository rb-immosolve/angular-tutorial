import { Component, EventEmitter, Output } from '@angular/core';
import { UNITS, Unit, Ingredient } from '../../../model/ingredient.model';
import { Logger } from 'src/app/lib/services/logging.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent {
  @Output('addIngredient') addIngredientEvent = new EventEmitter<Ingredient>()
  @Output('removeIngredient') deleteIngredientEvent = new EventEmitter<Ingredient>()

  constructor(private log: Logger) { }

  units = UNITS
  name: string = ""
  amount: number = 0
  unit: Unit = "pcs"

  addIngredient() {
    this.addIngredientEvent.emit(new Ingredient(this.name, this.amount, this.unit))
    this.clear()
    this.log.info('New ingredient added')
  }

  deleteIngredient() {
    this.deleteIngredientEvent.emit(new Ingredient(this.name, this.amount, this.unit))
    this.clear()
  }

  clear() {
    this.name = ""
    this.amount = 0
    this.unit = "pcs"
  }
}
