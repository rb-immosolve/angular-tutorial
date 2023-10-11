import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "src/app/model/recipe.model";

@Injectable({ providedIn: 'root' })
export class RecipeService {
    recipeList: Recipe[] = []
    changeActiveRecipe = new EventEmitter<Recipe>()

    constructor() {
        this.addRecipe(new Recipe('A Test Recipe', 'This is simply a test', 'https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com//content/f1/40/d07fd28b4f23954ed7ea4bcdd2af/card-overlay._TTW_._CR0,0,1080,648_.jpg'));
        this.addRecipe(new Recipe('Recipe2', 'This is simply a test', 'https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com//content/f1/40/d07fd28b4f23954ed7ea4bcdd2af/card-overlay._TTW_._CR0,0,1080,648_.jpg'));
    }

    addRecipe(recipe: Recipe): void {
        this.recipeList.push(recipe);
    }

    removeRecipeByName(recipeName: string): void {
        this.recipeList = this.recipeList.filter((item) => item.name.toLowerCase() !== recipeName.toLowerCase());
    }

    removeRecipeByRecipe(recipe: Recipe): void {
        this.recipeList = this.recipeList.filter(
            (item) => !(item.name === recipe.name && item.description === recipe.description && item.imagePath === recipe.imagePath)
        );
    }

    getRecipes(): Recipe[] {
        return this.recipeList;
    }
}