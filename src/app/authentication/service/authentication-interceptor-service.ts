import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from './authentication-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  //console.log('AuthenticationInterceptor called');
  const authService = inject(AuthenticationService);
  const token = authService.getToken();

  if (token) {
    //console.log('Adding token to request:', token);
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(req);
};
