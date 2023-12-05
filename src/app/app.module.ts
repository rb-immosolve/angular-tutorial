import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { ShoppingListComponent } from './components/shopping/shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './components/shopping/shopping-list-edit/shopping-list-edit.component';
import { DropdownDirective } from './lib/directives/dropdown-directive';
import { AppRouteModule } from './routes.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './components/auth/auth.component';
import { authGuard, recipeResolver, userAutologin } from './lib/services/resolvers-guards.service';
import { LoaderComponent } from './components/loader/loader.component';
import { HttpInterceptorService } from './lib/services/http-interceptor.service';
import { ModalPopupComponent } from './components/modal-popup/modal-popup.component';
import { RecipesModule } from './components/recipe/recipe.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    DropdownDirective,
    AuthComponent,
    LoaderComponent,
    ModalPopupComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRouteModule,
    HttpClientModule,
    RecipesModule
  ],
  providers: [
    {
      provide: 'recipeResolverFn',
      useFactory: () => { return recipeResolver }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    {
      provide: 'userAutologinFn',
      useValue: userAutologin
    },
    {
      provide: 'authGuard',
      useValue: authGuard
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
