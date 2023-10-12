import { Ingredient } from "src/app/model/ingredient.model";
import { Recipe } from "src/app/model/recipe.model";

export const bootstrapRecipes = [
    new Recipe(
        'Potato Soup',
        'This is simply a test',
        'https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com//content/f1/40/d07fd28b4f23954ed7ea4bcdd2af/card-overlay._TTW_._CR0,0,1080,648_.jpg',
        [
            new Ingredient("Potato", 500, "g"),
            new Ingredient("Onion", 2, "pcs"),
            new Ingredient("Garlic", 20, "g"),
            new Ingredient("Water", 1.5, "kg")
        ]),
    new Recipe(
        'Schnitzel',
        'This is simply a test',
        'https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com//content/f1/40/d07fd28b4f23954ed7ea4bcdd2af/card-overlay._TTW_._CR0,0,1080,648_.jpg',
        [
            new Ingredient("Pork Chops", 2, "pcs"),
            new Ingredient("Flour", 100, "g"),
            new Ingredient("Egg", 1, "pcs"),
            new Ingredient("Garlic", 40, "g")
        ]
    )
];