import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { AuthService, AuthResponse } from 'src/app/lib/services/auth.service';
import { LoaderService } from 'src/app/lib/services/loader.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  form: FormGroup;
  errorMsg: string = '';
  loggedInUser: User;

  constructor(
    private authService: AuthService,
    private loaderService: LoaderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
    this.authService.userSubject.subscribe(user => { this.loggedInUser = user });
  }

  submit(register?: boolean) {
    this.errorMsg = '';
    if (!this.form.valid) {
      this.errorMsg = 'Error: Invalid form. Please fill valid data.';
      return;
    }

    let authResponse: Observable<AuthResponse>;
    if (register) {
      authResponse = this.authService.register(this.form.value.email, this.form.value.password);
    }
    else {
      authResponse = this.authService.login(this.form.value.email, this.form.value.password);
    }

    authResponse.subscribe({
      next: (data: AuthResponse) => {
        this.loaderService.loaderChange.next(false);
        this.router.navigate(['/recipe']);
        this.form.reset();

      },
      error: (errorMsg: Error) => {
        this.errorMsg = errorMsg.message;
        this.loaderService.loaderChange.next(false);
      }
    });
  }

  register() {
    this.submit(true);
  }

}
