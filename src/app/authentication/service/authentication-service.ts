import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, EMPTY, Observable, tap, throwError} from 'rxjs';
import {AuthResponse} from '../dto/auth-response';
import {catchError} from 'rxjs/operators';
import {RegisterResponse} from '../dto/register-response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = `${environment.apiUrl}/auth`;

  private currentUserSubject = new BehaviorSubject<boolean>(false);
  public currentUser$ = this.currentUserSubject.asObservable();


  constructor(private http: HttpClient) {
  }

  // TODO: Where should I route to home? At the caller? - Caller: Separation of Concerns
  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, {username, password}).pipe(
      tap((response) => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        this.currentUserSubject.next(true);
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => error);
      })
    );
  }

  // TODO: Return Observable<RegisterResponse> or Observable<any>? - First: Type safety
  register(email: string, username: string, password: string): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, {email, username, password}).pipe(
      tap((response) => {
        console.log('Register successful with id: ', response.id);
      }),
      catchError((error) => {
        console.error('Register error:', error);
        return throwError(() => error);
      })
    );
  }

  logout(): Observable<void> {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();

    return this.http.post<void>(`${this.apiUrl}/logout`, {accessToken, refreshToken}).pipe(
      tap(() => {
        this.handleSuccessfulLogout();
      }),
      catchError(this.handleLogoutError.bind(this))
    );
  }

  handleSuccessfulLogout(): void {
    this.removeTokens();
    this.currentUserSubject.next(false);
  }

  handleLogoutError(error: HttpErrorResponse): Observable<never> {
    console.error('Logout error:', error);
    if (error.status === 401) {
      this.handleSuccessfulLogout();
      return EMPTY;
    }
    return throwError(() => new Error('Logout failed'));
  }


  removeTokens(): void {
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

  refreshAccessToken(): Observable<AuthResponse> {
    const refreshToken = this.getRefreshToken();

    return this.http.post<AuthResponse>(`${this.apiUrl}/refresh`, {refreshToken}).pipe(
      tap((response) => {
        localStorage.setItem('accessToken', response.accessToken);
        this.currentUserSubject.next(true);
      }),
      catchError((error) => {
        this.logout();
        return throwError(() => error);
      })
    );
  }

  handleExpiredAccessToken(): Observable<AuthResponse> {
    return this.refreshAccessToken();
  }


}
