import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthFirebaseConnector, SignupResponse } from 'src/app/lib/services/auth-firebase.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  form:FormGroup;

  constructor(private authFirebaseConnector : AuthFirebaseConnector) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email : new FormControl(null, [Validators.required, Validators.email]),
      password : new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  submit() {
    this.form.reset();
  }

  register(){
    this.authFirebaseConnector.register(this.form.value.email, this.form.value.password)
      .subscribe({next: (data:SignupResponse) => {
        
      }});
    this.form.reset();
  }

}
