import { NgModule } from "@angular/core";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";
import { RecipeComponent } from "./recipe.component";
import { RecipeHomeComponent } from "./recipe-home/recipe-home.component";
import { RecipeUpsertComponent } from "./recipe-upsert/recipe-upsert.component";
import { MaxStringLengthPipe } from "src/app/lib/pipes/max-string-length.pipe";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { RecipeRoutesModule } from "./recipe.routes.module";

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
        ReactiveFormsModule,
        CommonModule
    ]
})
export class RecipesModule{}