import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../../../model/ingredient.model';
import { ShoppingListService } from 'src/app/lib/services/shopping-list.service';
import { IngredientService } from 'src/app/lib/services/ingredient.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  errMsg: string = "";
  errSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService, private ingredientService: IngredientService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.shoppingList;
    this.errSubscription = this.ingredientService.errSubject.subscribe((errMsg: string) => {
      this.errMsg = errMsg;
    });
  }

  ngOnDestroy(): void {
    this.errSubscription.unsubscribe();
  }

}
