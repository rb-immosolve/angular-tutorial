import { Injectable } from "@angular/core";
import { Recipe } from "src/app/model/recipe.model";
import { bootstrapRecipes } from "../fixtures/recipes";

@Injectable({ providedIn: 'root' })
export class RecipeService {
    recipeList: Recipe[] = []

    constructor() {
        this.addRecipes(bootstrapRecipes);
    }

    addRecipe(recipe: Recipe): void {
        this.recipeList.push(recipe);
    }

    addRecipes(recipes: Recipe[]): void {
        recipes.map((item) => this.addRecipe(item));
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

    getRecipeById(id: number): Recipe {
        return this.recipeList.filter((item) => item.id === id)[0]
    }

    generateNextId(): number {
        let maxId = this.recipeList[0].id;
        this.recipeList.map(item => maxId = item.id > maxId ? item.id : maxId);
        return maxId + 1;
    }
}