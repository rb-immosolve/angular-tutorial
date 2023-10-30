import { Injectable } from "@angular/core";
import { Recipe } from "src/app/model/recipe.model";
import { Observable, Subject, tap } from "rxjs";
import { RecipeFirebaseConnector } from "./recipe-firebase.service";

@Injectable({ providedIn: 'root' })
export class RecipeService {
    recipeList: Recipe[] = [];
    firstFetchComplete: boolean = false;
    recipeListModification: Subject<Recipe[]> = new Subject<Recipe[]>();

    constructor(private recipeFirebaseConnector: RecipeFirebaseConnector) {
        this.getRecipesFromConnector();
    }

    addRecipe(recipe: Recipe): Observable<string> {
        let recipeId: string = '';
        return this.recipeFirebaseConnector.postRecipe(recipe).pipe(tap(id => {
            recipe.id = id;
            this.recipeList.push(recipe);
            this.recipeListModification.next(this.recipeList);
            recipeId = id;
        }));
    }

    addRecipes(recipes: Recipe[]): void {
        recipes.map((item) => this.addRecipe(item));
    }

    updateRecipeById(recipe: Recipe) {
        this.recipeFirebaseConnector.putRecipe(recipe).then(
            () => {
                const index: number = this.getRecipeIndex(recipe);
                this.recipeList[index] = recipe;
                this.recipeListModification.next(this.recipeList);
            }
        );
    }

    removeRecipeByName(recipeName: string): void {
        this.recipeList = this.recipeList.filter((item) => item.name.toLowerCase() !== recipeName.toLowerCase());
        this.recipeListModification.next(this.recipeList);
    }

    removeRecipeByRecipe(recipe: Recipe): void {
        this.recipeFirebaseConnector.deleteRecipe(recipe).then(() => {
            this.recipeList = this.recipeList.filter(
                (item) => !(item.name === recipe.name && item.description === recipe.description && item.imagePath === recipe.imagePath)
            );
            this.recipeListModification.next(this.recipeList);
        })
    }

    getRecipes(): Recipe[] {
        return this.recipeList;
    }

    getRecipeById(id: string): Recipe {
        return this.recipeList.filter((item) => item.id === id)[0]
    }

    getRecipeIndex(recipe: Recipe) {
        for (let i = 0; i < this.recipeList.length; i++) {
            if (this.recipeList[i].id === recipe.id)
                return i;
        }
        return -1;
    }

    async getRecipesFromConnector() {
        this.recipeFirebaseConnector.getAllRecipes().subscribe(value => {
            this.recipeList = value;
            this.recipeListModification.next(this.recipeList);
            this.firstFetchComplete = true;
        });
    }
}