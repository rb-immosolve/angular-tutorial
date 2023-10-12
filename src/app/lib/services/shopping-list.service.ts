import { Injectable } from "@angular/core";
import { Ingredient } from "src/app/model/ingredient.model";
import { Recipe } from "src/app/model/recipe.model";

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
    shoppingList: Ingredient[] = []

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
            this.shoppingList.push(ingredient)
        }
        return ""
    }

    addRecipeToShoppingList(recipe: Recipe) {
        recipe.ingredients.map((item) => this.addIngredientToShoppingList(item))
    }

    removeIngredientFromShoppingList(ingredient: Ingredient): string {
        let ingredientDeleted: boolean = false
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