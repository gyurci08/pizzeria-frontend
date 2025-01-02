import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthenticationService} from '../../service/authentication-service';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {catchError, finalize} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {MatIcon} from '@angular/material/icon';
import {Router} from '@angular/router';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatCardHeader,
    MatError,
    MatIcon,
    MatIconButton,
    MatLabel,
    MatProgressSpinner
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null;
  hidePassword = true;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const {username, password} = this.loginForm.value;
      this.isLoading = true;
      this.loginError = null;

      this.authService.login(username, password).pipe(
        catchError(this.handleError.bind(this)),
        finalize(() => this.isLoading = false)
      ).subscribe(() => this.router.navigate(['/dashboard']));
    }
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Login error:', error);
    this.loginError = this.getErrorMessage(error);
    return throwError(() => error);
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 0:
        return 'Unable to connect to the server. Please check your internet connection.';
      case 401:
        return 'Invalid username or password.';
      case 403:
        return 'User does not exist.';
      default:
        return 'An unexpected error occurred. Please try again later.';
    }
  }


}
