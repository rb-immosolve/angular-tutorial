import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { RecipeListComponent } from './components/recipe/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './components/recipe/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailsComponent } from './components/recipe/recipe-details/recipe-details.component';
import { ShoppingListComponent } from './components/shopping/shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './components/shopping/shopping-list-edit/shopping-list-edit.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { DropdownDirective } from './lib/directives/dropdown-directive';
import { AppRouteModule } from './lib/modules/routes.module';
import { RecipeHomeComponent } from './components/recipe/recipe-home/recipe-home.component';
import { RecipeUpsertComponent } from './components/recipe/recipe-upsert/recipe-upsert.component';
import { MaxStringLengthPipe } from './lib/pipes/max-string-length.pipe';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailsComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    RecipeComponent,
    DropdownDirective,
    RecipeHomeComponent,
    RecipeUpsertComponent,
    MaxStringLengthPipe,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRouteModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
