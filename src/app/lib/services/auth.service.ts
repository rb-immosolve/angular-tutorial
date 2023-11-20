import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, catchError, map, take, tap, throwError } from "rxjs";
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

export interface RefreshResponse {
  access_token: string;
  expires_in: string;
  id_token: string;
  project_id: string;
  refresh_token: string;
  token_type: string;
  user_id: string;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  private signUpUrl: string = "https://identitytoolkit.googleapis.com/v1/accounts:signUp";
  private signInUrl: string = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword";
  private refreshUrl: string = "https://securetoken.googleapis.com/v1/token";
  private api_key: string = "AIzaSyDLYudjDGVy9RaS6mnmnbatvA9Z1K0P9CI";

  userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private autoRelogger;

  constructor(
    private httpClient: HttpClient,
    private loaderService: LoaderService,
    private router: Router
  ) { }

  register(email: string, password: string): Observable<AuthResponse> {
    const options = {
      params: new HttpParams().set('key', this.api_key),
    };

    const requestBody = {
      email: email,
      password: password,
      returnSecureToken: true,
    }
    this.loaderService.loaderChange.next(true);
    return this.httpClient.post<AuthResponse>(this.signUpUrl, requestBody, options).pipe(
      catchError(this.handleAuthError),
      tap(data => { this.handleAuthenticatedUser(data) })
    );
  }

  login(email: string, password: string): Observable<AuthResponse> {
    const options = {
      params: new HttpParams().set('key', this.api_key),
    };
    const requestBody = {
      email: email,
      password: password,
      returnSecureToken: true,
    }
    this.loaderService.loaderChange.next(true);

    return this.httpClient.post<AuthResponse>(this.signInUrl, requestBody, options).pipe(
      catchError(this.handleAuthError),
      tap(data => { this.handleAuthenticatedUser(data) })
    );
  }

  logout() {
    this.userSubject.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.autoRelogger) {
      clearTimeout(this.autoRelogger);
    }
    this.autoRelogger = null;
  }

  autoLogin() {
    const userData = localStorage.getItem('userData');
    if (!userData) return;
    const jsonUser = JSON.parse(userData);
    const userObject: User = new User(
      jsonUser.email,
      jsonUser.id,
      jsonUser._token,
      new Date(jsonUser._tokenExpirationDate),
      jsonUser._refreshToken
    );
    if (userObject.token) {
      this.userSubject.next(userObject);
      this.relogAfter(userObject);
    } else {
      this.autoRelogin(userObject).subscribe(data => this.loaderService.loaderChange.next(false));
    }
  }

  autoRelogin(userObject: User) {
    const options = {
      params: new HttpParams().set('key', this.api_key)
    };
    const body = {
      grant_type: 'refresh_token',
      refresh_token: userObject.refreshToken
    };
    this.loaderService.loaderChange.next(true);
    return this.httpClient.post<RefreshResponse>(this.refreshUrl, body, options).pipe(
      catchError(this.handleAuthError),
      tap((response) => { this.handleReauthenticatedUser(userObject, response); })
    );
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
    localStorage.setItem('userData', JSON.stringify(loggedInUser));
    this.relogAfter(loggedInUser);
  }

  private handleReauthenticatedUser(userObject: User, response: RefreshResponse) {
    const expiry = new Date(new Date().getTime() + parseInt(response.expires_in) * 1000);
    const reloggedInUser = new User(
      userObject.email,
      response.user_id,
      response.id_token,
      expiry,
      response.refresh_token
    );
    this.userSubject.next(reloggedInUser);
    localStorage.setItem('userData', JSON.stringify(reloggedInUser));
    localStorage.setItem('lastRefreshedAt', new Date().toString());
    this.relogAfter(reloggedInUser);
  }

  relogAfter(userObject: User) {
    const duration: number = userObject.expiresIn;
    this.autoRelogger = setTimeout(
      () => { this.autoRelogin(userObject).subscribe(data => this.loaderService.loaderChange.next(false)); },
      duration
    );
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