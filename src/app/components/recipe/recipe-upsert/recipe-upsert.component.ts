import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/lib/services/recipe.service';
import { Ingredient, UNITS } from 'src/app/model/ingredient.model';
import { Recipe } from 'src/app/model/recipe.model';

@Component({
  selector: 'app-recipe-upsert',
  templateUrl: './recipe-upsert.component.html',
  styleUrls: ['./recipe-upsert.component.scss']
})
export class RecipeUpsertComponent implements OnInit {
  recipe: Recipe;
  editMode: boolean = false;
  form: FormGroup;
  units: readonly string[] = UNITS;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let id = params['id'];
      if (id === undefined) {
        id = this.recipeService.generateNextId();
        this.recipe = new Recipe(id, '', '', '', []);
        this.editMode = false;
      } else {
        this.recipe = this.recipeService.getRecipeById(+id);
        this.editMode = true;
      }
    });

    this.form = new FormGroup({
      'name': new FormControl(this.editMode ? this.recipe.name : null),
      'description': new FormControl(this.editMode ? this.recipe.description : null),
      'imagePath': new FormControl(this.editMode ? this.recipe.imagePath : null),
      'ingredients': this.formBuilder.array([]),
    });
    for (let i of this.recipe.ingredients) {
      (this.form.get('ingredients') as FormArray).push(this.createIngredient(i))
    }

    console.log(this.form);
  }

  submitForm() {
    const formIngredients: Ingredient[] = []
    for (let i of (this.form.get('ingredients') as FormArray).controls) {
      formIngredients.push(new Ingredient(i.value.name, i.value.amount, i.value.unit));
    }
    const formRecipe: Recipe = new Recipe(
      this.recipe.id,
      this.form.get('name').value,
      this.form.get('description').value,
      this.form.get('imagePath').value,
      formIngredients
    );

    if (this.editMode) {
      this.recipeService.updateRecipeById(formRecipe);
      this.router.navigate(['../'], { relativeTo: this.route });
    } else {
      this.recipeService.addRecipe(formRecipe);
      this.router.navigate(['../', formRecipe.id], { relativeTo: this.route });
    }
  }

  get ingredients() {
    const controls = (<FormArray>this.form.get('ingredients')).controls;
    return controls;
  }

  createIngredient(i: Ingredient): FormGroup {
    return this.formBuilder.group({
      name: i.name,
      amount: i.amount,
      unit: i.unit
    });
  }

  addAnotherIngredient(): void {
    (this.form.get('ingredients') as FormArray).push(this.createIngredient(new Ingredient('', 0, 'pcs')));
  }

  removeIngredient(index: number) {
    (this.form.get('ingredients') as FormArray).removeAt(index);
  }

  clearForm() {
    while ((this.form.get('ingredients') as FormArray).controls.length > 0) {
      (this.form.get('ingredients') as FormArray).removeAt(0);
    }
    this.form.reset({});
  }

  cancelForm() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}