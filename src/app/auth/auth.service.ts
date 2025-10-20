import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, finalize, map, Subject, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { MessageType, ModalService } from '../shared/modal.service';

export interface UserAuth {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private modalService = inject(ModalService);
  private apiUrl = 'http://localhost:3500';
  private tokenExpirationTimer: any;
  isRefreshing = signal(false);
  user = signal<User | null>(null);

  register(userAuth: UserAuth) {
    return this.http
      .post<{ success: string }>(`${this.apiUrl}/register`, {
        user: userAuth.email,
        pwd: userAuth.password,
      })
      .pipe(catchError(this.handleError));
  }

  login(userAuth: UserAuth) {
    return this.http
      .post<{
        success: string;
        username: string;
        accessToken: string;
        expiresIn: number;
      }>(`${this.apiUrl}/auth`, {
        user: userAuth.email,
        pwd: userAuth.password,
      })
      .pipe(
        catchError(this.handleError),
        tap((response) =>
          this.handleAuth(
            response.username,
            response.accessToken,
            response.expiresIn,
          ),
        ),
      );
  }

  autoLogin() {
    const userData = localStorage.getItem('user');
    if (!userData) {
      return;
    }
    const user: {
      email: string;
      _accessToken: string;
      _tokenExpirationDate: string;
    } = JSON.parse(userData);

    const loadedUser = new User(
      user.email,
      user._accessToken,
      new Date(user._tokenExpirationDate),
    );

    this.user.set(loadedUser);
  }

  logout() {
    this.http
      .get(`${this.apiUrl}/logout`)
      .pipe(
        catchError(this.handleError),
        finalize(() => {
          this.user.set(null);
          localStorage.removeItem('user');
          if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
          }
          this.tokenExpirationTimer = null;
          this.router.navigate(['/']);
        }),
      )
      .subscribe();
  }

  autoLogout() {
    console.log('setting auto logout');
    this.tokenExpirationTimer = setTimeout(
      () => {
        this.modalService.showModal(
          'Votre session a expiré. Veuillez vous reconnecter.',
          MessageType.Error,
        );
        this.logout();
      },
      24 * 60 * 60 * 1000, // Durée de vie du cookie de refresh côté backend
    );
  }

  refreshToken() {
    return this.http
      .get<{
        success: string;
        username: string;
        accessToken: string;
        expiresIn: number;
      }>(`${this.apiUrl}/refresh`)
      .pipe(
        catchError(this.handleError),
        tap((response) =>
          this.handleAuth(
            response.username,
            response.accessToken,
            response.expiresIn,
          ),
        ),
      );
  }

  private handleError = (errorRes: HttpErrorResponse) => {
    let errorMsg = 'Une erreur inconnue est survenue.';

    if (!errorRes.error || !errorRes.error.message) {
      return throwError(() => new Error(errorMsg));
    }

    return throwError(() => new Error(errorRes.error.message));
  };

  private handleAuth = (email: string, token: string, expiresIn: number) => {
    const tokenExpirationDate = new Date(
      new Date().getTime() + expiresIn * 1000,
    );
    const user = new User(email, token, tokenExpirationDate);
    this.user.set(user);
    this.autoLogout();
    localStorage.setItem('user', JSON.stringify(user));
  };
}
