import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, of, tap, throwError} from 'rxjs';
import {AuthResponse} from '../dto/auth-response';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = `${environment.apiUrl}/auth`;


  constructor(private http: HttpClient,
              private router: Router,) {
  }


  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, {username, password}).pipe(
      tap((response) => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
      })
    );
  }

  logout(): Observable<any> {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();

    return this.http.post(`${this.apiUrl}/logout`, {accessToken, refreshToken}).pipe(
      tap(() => {
        console.log('Logout successful');
        this.removeTokens();
      }),
      catchError((error) => {
        console.error('Logout error:', error);
        if (error.status === 401) {
          console.log('Received 401 during logout, removing tokens anyway');
          this.removeTokens();
          return of(null); // Return a new observable to continue the stream
        }
        return throwError(() => error);
      })
    );
  }

  private removeTokens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }


  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }


  isAccessTokenExpired(): boolean {
    const accessToken = this.getAccessToken();
    if (!accessToken) return true;

    const payload = JSON.parse(atob(accessToken.split('.')[1]));
    const expirationTime = payload.exp * 1000; // Convert to milliseconds
    return Date.now() > expirationTime;
  }

  refreshAccessToken(): Observable<AuthResponse> {
    const refreshToken = this.getRefreshToken();

    return this.http.post<AuthResponse>(`${this.apiUrl}/refresh`, {refreshToken}).pipe(
      tap((response) => {
        localStorage.setItem('accessToken', response.accessToken);
      })
    );
  }

  handleExpiredAccessToken(): Observable<AuthResponse> {
    return this.refreshAccessToken();
  }


}
