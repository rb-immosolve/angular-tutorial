import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, catchError, tap, throwError } from "rxjs";
import { LoaderService } from "./loader.service";
import { User } from "src/app/model/user.model";
import { Router } from "@angular/router";

export interface AuthResponse {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  displayName?: string;
  registered?: boolean;
}


@Injectable({ providedIn: "root" })
export class AuthService {
  private signUpUrl: string = "https://identitytoolkit.googleapis.com/v1/accounts:signUp";
  private signInUrl: string = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword";
  private api_key: string = "AIzaSyDLYudjDGVy9RaS6mnmnbatvA9Z1K0P9CI";

  userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(
    private httpClient: HttpClient,
    private loaderService: LoaderService,
    private router: Router
  ) { }

  register(email: string, password: string): Observable<AuthResponse> {
    const options = {
      params: {
        'key': this.api_key,
      },
    };

    const requestBody = {
      email: email,
      password: password,
      returnSecureToken: true,
    }
    this.loaderService.loaderChange.next(true);
    return this.httpClient.post<AuthResponse>(this.signUpUrl, requestBody, options)
      .pipe(catchError(this.handleAuthError), tap(data => { this.handleAuthenticatedUser(data) }));
  }

  login(email: string, password: string): Observable<AuthResponse> {
    const options = {
      params: {
        'key': this.api_key,
      },
    };
    const requestBody = {
      email: email,
      password: password,
      returnSecureToken: true,
    }
    this.loaderService.loaderChange.next(true);

    return this.httpClient.post<AuthResponse>(this.signInUrl, requestBody, options)
      .pipe(catchError(this.handleAuthError), tap(data => { this.handleAuthenticatedUser(data) }));
  }

  logout() {
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }

  private handleAuthenticatedUser(response: AuthResponse) {
    const expiry: Date = new Date(new Date().getTime() + parseInt(response.expiresIn) * 1000);
    const loggedInUser = new User(
      response.email,
      response.localId,
      response.idToken,
      expiry,
      response.refreshToken
    );
    this.userSubject.next(loggedInUser);
  }

  private handleAuthError(error: HttpErrorResponse) {
    let errorMessage = 'Error: An unknown error occurred.';
    if (!error.error || !error.error.error) {
      return throwError(() => new Error(errorMessage));
    }
    switch (error.error.error.message) {
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Error: Invalid credentials. Please try again.';
        break;
      case 'USER_DISABLED':
        errorMessage = 'Error: This account has been disabled. Please contact support.';
        break;
      case 'EMAIL_EXISTS':
        errorMessage = 'Error: This email already exists in the system. Please login instead or try a different email.';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Error: New accounts are currently disabled. Please try again later.';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'Error: Too many attempts from your device. Please try again later, or contact support.';
        break;
    }
    return throwError(() => new Error(errorMessage));
  }
}