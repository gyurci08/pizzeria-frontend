import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {AuthResponse} from '../entity/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  logout(): Observable<any> {
    const token = this.getToken(); // Retrieves the JWT token from local storage
    return this.http.post(`${this.apiUrl}/logout`, { token }).pipe(
      tap(() => {
        localStorage.removeItem('token'); // Remove the token from local storage after logout
      })
    );
  }



  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken(); // Converts the token to a boolean
  }
}
