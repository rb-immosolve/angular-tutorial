import { NgModule } from "@angular/core";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";
import { RecipeComponent } from "./recipe.component";
import { RecipeHomeComponent } from "./recipe-home/recipe-home.component";
import { RecipeUpsertComponent } from "./recipe-upsert/recipe-upsert.component";
import { MaxStringLengthPipe } from "src/app/lib/pipes/max-string-length.pipe";
import { RecipeRoutesModule } from "./recipe.routes.module";
import { SharedModule } from "src/app/lib/modules/shared.module";
import { recipeResolver } from "src/app/lib/services/resolvers-guards.service";

@NgModule({
    declarations: [
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailsComponent,
        RecipeComponent,
        RecipeHomeComponent,
        RecipeUpsertComponent,
        MaxStringLengthPipe
    ],
    imports: [
        RecipeRoutesModule,
        SharedModule
    ],
    providers: [
        {
            provide: 'recipeResolverFn',
            useFactory: () => { return recipeResolver }
        },
    ]
})
export class RecipesModule{}