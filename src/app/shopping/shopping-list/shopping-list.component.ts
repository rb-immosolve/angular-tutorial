import { Component } from '@angular/core';
import { Ingredient } from '../../model/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  ingredients:Ingredient[] = [
    new Ingredient('Apples', 5, 'pcs'),
    new Ingredient('Tomatoes', 100, 'g'),
  ];
  errMsg:string = ""

  addIngredient(ingredient:Ingredient){
    let existingIngredientIncremented:boolean = false
    for(let i = 0; i < this.ingredients.length; i++){
      if(this.ingredients[i].name.toLowerCase() === ingredient.name.toLowerCase() && this.ingredients[i].unit === ingredient.unit){
        this.ingredients[i].amount += ingredient.amount
        existingIngredientIncremented = true
      }
    }
    if(!existingIngredientIncremented){
      this.ingredients.push(ingredient)
    }
    this.errMsg = ""
  }

  removeIngredient(ingredient:Ingredient){
    let ingredientDeleted:boolean = false
    for(let i = 0; i < this.ingredients.length; i++){
      if(this.ingredients[i].name.toLowerCase() === ingredient.name.toLowerCase() && this.ingredients[i].unit === ingredient.unit){
        if(this.ingredients[i].amount >= ingredient.amount){
          this.ingredients[i].amount -= ingredient.amount
          if(this.ingredients[i].amount == 0){
            this.ingredients.splice(i,1)
          }
          this.errMsg = ""
          ingredientDeleted = true
        }else{
          this.errMsg = `Cannot delete ${ingredient.amount}${ingredient.unit} of ${ingredient.name} from Shopping List - insufficient amount in list`
          ingredientDeleted = true
        }
      }
    }
    if(!ingredientDeleted){
      this.errMsg = `Shopping list does not have ${ingredient.name}(${ingredient.unit}) to delete`
    }
  }

}
