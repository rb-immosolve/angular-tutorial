import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient, Unit } from "src/app/model/ingredient.model";
import { Recipe } from "src/app/model/recipe.model";

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
    shoppingList: Ingredient[] = []
    updateIngredientEvent = new Subject<number>();

    addIngredientToShoppingList(ingredient: Ingredient): string {
        if (ingredient.name === "" || ingredient.amount === 0) {
            return "Please specify a name and qty. to add to Shopping List"
        } else if (ingredient.amount < 0) {
            return "Please specify a qty. greater than 0 to add to Shopping List"
        }
        let existingIngredientIncremented: boolean = false
        for (let i = 0; i < this.shoppingList.length; i++) {
            if (this.shoppingList[i].name.toLowerCase() === ingredient.name.toLowerCase() && this.shoppingList[i].unit === ingredient.unit) {
                this.shoppingList[i].amount += ingredient.amount
                existingIngredientIncremented = true
            }
        }
        if (!existingIngredientIncremented) {
            this.shoppingList.push(new Ingredient(ingredient.name, ingredient.amount, ingredient.unit))
        }
        return ""
    }

    addRecipeToShoppingList(recipe: Recipe) {
        for (let i of recipe.ingredients) {
            this.addIngredientToShoppingList(i);
        }
    }

    updateIngredientInShoppingList(index:number, amount:number, unit:Unit): string{
      const ingredientName = this.shoppingList[index].name;
      for(let i = 0; i < this.shoppingList.length; i++){
        if(this.shoppingList[i].name === ingredientName && this.shoppingList[i].unit === unit && i != index){
          return 'This ingredient already exists in the shopping list with the desired unit. Please edit that entry instead.';
        }
      }
      this.shoppingList[index].amount = amount;
      this.shoppingList[index].unit = unit;
      return "";
    }

    deleteIngredientFromShoppingList(index:number):string{
      if(index >= this.shoppingList.length){
        return "Invalid ingredient index provided; cannot delete"
      }
      this.shoppingList.splice(index,1);
      return "";
    }

    reduceIngredientFromShoppingList(ingredient: Ingredient): string {
      for (let i = 0; i < this.shoppingList.length; i++) {
        if (this.shoppingList[i].name.toLowerCase() === ingredient.name.toLowerCase() && this.shoppingList[i].unit === ingredient.unit) {
          if (this.shoppingList[i].amount >= ingredient.amount) {
            this.shoppingList[i].amount -= ingredient.amount
            if (this.shoppingList[i].amount == 0) {
              this.shoppingList.splice(i, 1)
            }
            return ""
          } else {
            return `Cannot delete ${ingredient.amount}${ingredient.unit} of ${ingredient.name} from Shopping List - insufficient amount in list`
          }
        }
      }
      return `Shopping list does not have ${ingredient.name}(${ingredient.unit}) to delete`
    }
}