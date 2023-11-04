import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { LoaderService } from "./loader.service";

export interface SignupResponse {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
}


@Injectable({ providedIn: "root" })
export class AuthFirebaseConnector {
  private signUpUrl: string = "https://identitytoolkit.googleapis.com/v1/accounts:signUp";
  private api_key: string = "AIzaSyDLYudjDGVy9RaS6mnmnbatvA9Z1K0P9CI";

  constructor(private httpClient: HttpClient, private loaderService: LoaderService) { }

  register(email: string, password: string): Observable<SignupResponse> {
    const headers = {
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
    return this.httpClient.post<SignupResponse>(this.signUpUrl, requestBody, headers)
      .pipe(catchError(error => {
        let errorMessage: string = 'An unknown error occurred';
        if (!error.error || !error.error.error) {
          return throwError(() => new Error(errorMessage));
        }
        switch (error.error.error.message) {
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
      }));
  }
}