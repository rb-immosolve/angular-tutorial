import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthFirebaseConnector, SignupResponse } from 'src/app/lib/services/auth-firebase.service';
import { LoaderService } from 'src/app/lib/services/loader.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  form: FormGroup;
  errorMsg: string = '';

  constructor(
    private authFirebaseConnector: AuthFirebaseConnector,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  submit() {
    this.errorMsg = '';
    this.form.reset();
  }

  register() {
    this.errorMsg = '';
    if (!this.form.valid) {
      console.log(this.form);
      this.errorMsg = 'Attempt to register with invalid form. Please fill valid data.';
      return;
    }
    this.authFirebaseConnector.register(this.form.value.email, this.form.value.password)
      .subscribe({
        next: (data: SignupResponse) => {
          console.log(data);
          this.loaderService.loaderChange.next(false);
        },
        error: (errorMsg: Error) => {
          this.errorMsg = errorMsg.message;
          this.loaderService.loaderChange.next(false);
        }
      });
    this.form.reset();
  }

}
