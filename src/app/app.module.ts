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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './components/auth/auth.component';
import { authGuard, recipeResolverFn, userAutologinFn } from './lib/services/auto-resolvers.service';
import { LoaderComponent } from './components/loader/loader.component';
import { HttpInterceptorService } from './lib/services/http-interceptor.service';

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
    AuthComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRouteModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: 'recipeResolverFn',
      useFactory: () => { return recipeResolverFn }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    {
      provide: 'userAutologinFn',
      useValue: userAutologinFn
    },
    {
      provide: 'authGuard',
      useValue: authGuard
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
