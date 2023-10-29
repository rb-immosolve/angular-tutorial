import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Ingredient } from "src/app/model/ingredient.model";
import { Recipe, GetRecipeFirebase, PostRecipeFirebase, PutRecipeFirebase } from "src/app/model/recipe.model";

@Injectable({ providedIn: 'root' })
export class RecipeFirebaseConnector {
    private connectionAddress: string = "https://angular-tutorial-recipe-d938c-default-rtdb.europe-west1.firebasedatabase.app/";
    private database: string = "test";
    private tableName: string = "recipes";
    private extension: string = ".json";

    constructor(private httpClient: HttpClient) { }

    getFullAddress(dbObjectPath: string, absolute: boolean = false): string {
        if (absolute === true) {
            return this.connectionAddress + dbObjectPath;
        }
        let path: string = this.connectionAddress + this.database + '/' + this.tableName;
        if (dbObjectPath.length > 0) {
            if (dbObjectPath.startsWith('/')) {
                path = path + dbObjectPath;
            }
            else {
                path = path + '/' + dbObjectPath;
            }
        }
        return path + this.extension;
    }

    getAllRecipes(): Observable<Recipe[]> {
        const url: string = this.getFullAddress('');
        const recipes: Recipe[] = [];
        return this.httpClient.get<{ [s: string]: GetRecipeFirebase }>(url).pipe(map((data) => {
            for (let dbKey in data) {
                let newRecipe: Recipe = new Recipe(
                    dbKey,
                    data[dbKey].name,
                    data[dbKey].description,
                    data[dbKey].imagePath,
                    []
                );
                let ingredients: Ingredient[] = []
                for (let ingredient of data[dbKey].ingredients) {
                    ingredients.push(new Ingredient(ingredient.name, ingredient.amount, ingredient.unit));
                }
                newRecipe.ingredients = ingredients;
                recipes.push(newRecipe);
            }
            return recipes;
        }));
    }

    async postRecipe(recipe: Recipe): Promise<string> {
        const url: string = this.getFullAddress('');
        let id: string = "";
        const recipeData: PostRecipeFirebase = {
            name: recipe.name,
            description: recipe.description,
            imagePath: recipe.imagePath,
            ingredients: recipe.ingredients
        }
        this.httpClient.post<{ "name": string }>(url, recipeData).subscribe({
            next: (data) => {
                id = data['name'];
            }
        });
        return id;
    }

    async putRecipe(recipe: Recipe) {
        const url: string = this.getFullAddress(recipe.id);
        const recipeData: PutRecipeFirebase = {
            name: recipe.name,
            description: recipe.description,
            imagePath: recipe.imagePath,
            ingredients: recipe.ingredients
        };
        this.httpClient.put(url, recipeData).subscribe();
    }

    async deleteRecipe(recipe: Recipe) {
        const url: string = this.getFullAddress(recipe.id);
        this.httpClient.delete(url).subscribe();
    }
}