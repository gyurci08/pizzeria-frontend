import { HttpInterceptorFn, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from './authentication-service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService);
  const accessToken = authService.getAccessToken();

  // Add token to request if available
  if (accessToken) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${accessToken}` }
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('/auth/refresh')) {
        return authService.handleExpiredAccessToken().pipe(
          switchMap(() => {
            const newAccessToken = authService.getAccessToken();
            const newReq = req.clone({
              setHeaders: { Authorization: `Bearer ${newAccessToken}` }
            });
            return next(newReq);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
