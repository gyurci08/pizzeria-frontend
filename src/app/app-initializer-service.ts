import {Injectable} from '@angular/core';
import {AuthenticationService} from './authentication/service/authentication-service';

@Injectable({
  providedIn: 'root'
})
export class AppInitializerService {
  constructor(private authService: AuthenticationService) {
  }

  initializeApp() {
    // Poor experience as resets the session on refresh
    this.clearTokens();
  }

  private clearTokens() {
    this.authService.removeTokens();
  }
}
