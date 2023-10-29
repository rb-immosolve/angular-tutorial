import { Ingredient } from "./ingredient.model";

export interface BaseRecipe {
    name: string;
    description: string;
    imagePath: string;
    ingredients: Ingredient[];
}

export class Recipe implements BaseRecipe {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public imagePath: string,
        public ingredients: Ingredient[]
    ) { }
}

export interface GetRecipeFirebase extends BaseRecipe { }

export interface PostRecipeFirebase extends BaseRecipe { }

export interface PutRecipeFirebase extends BaseRecipe { }