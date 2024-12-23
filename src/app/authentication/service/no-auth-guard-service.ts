import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthenticationService} from './authentication-service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuardService implements CanActivate {
  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  canActivate(): boolean {
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigate(['']); // Redirect to home if already logged in
      return false; // Prevent access to the login routing
    }
    return true; // Allow access to the login routing
  }
}
