import { Component, OnDestroy, OnInit } from '@angular/core';
import { UNITS, Unit, Ingredient } from '../../../model/ingredient.model';
import { ShoppingListService } from 'src/app/lib/services/shopping-list.service';
import { IngredientService } from 'src/app/lib/services/ingredient.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  units = UNITS;
  form : FormGroup;
  updateEventSubscription: Subscription;
  editMode:boolean = false;
  editIndex:number;
  
  constructor(private shoppingListService: ShoppingListService, private ingredientService: IngredientService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'name' : new FormControl(null, [Validators.required]),
      'amount' : new FormControl(null, [Validators.required]),
      'unit' : new FormControl('pcs'),
    });
    this.updateEventSubscription = this.shoppingListService.updateIngredientEvent.subscribe(
      (index:number) => {
        this.editMode = true;
        this.editIndex = index;
        const updateIngredient:Ingredient = this.shoppingListService.shoppingList[index];
        this.form.setValue({
          'name' : updateIngredient.name,
          'amount' : updateIngredient.amount,
          'unit' : updateIngredient.unit
        })
      }
    )
  }

  ngOnDestroy(): void {

  }

  upsertIngredient() {
    const formValue = this.form.value
    let errMsg:string = "";
    if(!this.editMode){
      errMsg = this.shoppingListService.addIngredientToShoppingList(new Ingredient(formValue.name, formValue.amount, formValue.unit));
    }else{
      errMsg = this.shoppingListService.updateIngredientInShoppingList(this.editIndex, formValue.amount, formValue.unit);
    }

    if(errMsg === ""){
      this.clear();
    }else{
      this.ingredientService.emit(errMsg);
    }
  }

  deleteIngredient() {
    if(!this.editMode){
      this.ingredientService.emit('Error! Ingredient to delete not loaded correctly. Please refresh the page!');
      return;
    }
    const errMsg:string = this.shoppingListService.deleteIngredientFromShoppingList(this.editIndex);
    if(errMsg === ""){
      this.clear();
    }else{
      this.ingredientService.emit(errMsg)
    }
  }

  clear() {
    this.form.reset({'unit':'pcs'})
    this.editMode = false;
    this.ingredientService.emit('')
  }
}
