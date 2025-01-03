import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthenticationService} from './authentication-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  canActivate(): boolean {
    if (this.authenticationService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['auth/login']);
      return false;
    }
  }
}
