import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  filter,
  Observable,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { MessageType, ModalService } from '../shared/modal.service';

function addToken(
  req: HttpRequest<unknown>,
  token: string | null,
): HttpRequest<unknown> {
  return req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });
}

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);
  const modalService = inject(ModalService);
  const user = authService.user();
  const refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null,
  );

  req = req.clone({ withCredentials: true });

  if (!user || req.url.indexOf('refresh') !== -1) {
    return next(req);
  }

  if (user.accessToken) {
    req = addToken(req, user.accessToken);
  }
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        if (!authService.isRefreshing()) {
          authService.isRefreshing.set(true);
          refreshTokenSubject.next(null);

          return authService.refreshToken().pipe(
            switchMap((user: any) => {
              console.log('Refresh token successful', user);
              authService.isRefreshing.set(false);
              refreshTokenSubject.next(user.accessToken);
              return next(addToken(req, user.accessToken));
            }),
            catchError((err) => {
              console.error('Refresh token failed', err);
              authService.isRefreshing.set(false);
              return throwError(() => new Error(err));
            }),
          );
        } else {
          console.log('already refreshing token, waiting');
          return refreshTokenSubject.pipe(
            filter((token) => token !== null),
            take(1),
            switchMap((accessToken) => {
              console.log('retrying request with new token');
              return next(addToken(req, accessToken));
            }),
          );
        }
      } else {
        return throwError(() => error);
      }
    }),
  );
}
