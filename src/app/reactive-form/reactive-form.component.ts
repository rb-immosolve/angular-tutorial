import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from './customValidatorService';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {
  form : FormGroup;
  formPending = false;
  projectStatuses = ['Stable', 'Critical', 'Finished'];

  constructor(private customValidators : CustomValidators){}

  ngOnInit(): void {
      this.form = new FormGroup({
        'name' : new FormControl(null, [Validators.required, this.customValidators.nameBlacklist]),
        'email': new FormControl(null, [Validators.required, Validators.email], [this.customValidators.emailBlacklist]),
        'status': new FormControl('Stable'),
      });

      this.form.statusChanges.subscribe((status) => { this.formPending = (status === 'PENDING')? true:false; });
  }

  formSubmit(): void {
    console.log(this.form);
  }

}
