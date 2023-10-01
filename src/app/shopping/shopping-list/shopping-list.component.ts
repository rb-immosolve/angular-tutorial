import { Component } from '@angular/core';
import { Ingredient } from '../../model/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  ingredients:Ingredient[] = [
    new Ingredient('Apples', 5, 'pcs'),
    new Ingredient('Tomatoes', 100, 'g'),
  ];

}
