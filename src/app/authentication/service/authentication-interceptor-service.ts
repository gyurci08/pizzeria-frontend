import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, switchMap, throwError} from 'rxjs';
import {AuthenticationService} from './authentication-service';
import {inject} from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService);
  const accessToken = authService.getAccessToken();

  // Add token to request if available
  if (accessToken) {
    req = req.clone({
      setHeaders: {Authorization: `Bearer ${accessToken}`}
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('/auth')) {
        return authService.handleExpiredAccessToken().pipe(
          switchMap(() => {
            const newAccessToken = authService.getAccessToken();
            const newReq = req.clone({
              setHeaders: {Authorization: `Bearer ${newAccessToken}`}
            });
            return next(newReq);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
