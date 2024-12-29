import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthenticationService} from '../../service/authentication-service';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {catchError, finalize, tap} from 'rxjs/operators';
import { throwError } from 'rxjs';
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
export class LoginComponent{
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
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.isLoading = true;
      this.loginError = null; // Reset error message
      this.authService.login(username, password).pipe(
        tap(() => {
          console.log('Login successful');
          this.router.navigate(['/dashboard']);
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Login error:', error);
          if (error.status === 0) {
            this.loginError = 'Unable to connect to the server. Please check your internet connection.';
          } else if (error.status === 403) {
            this.loginError = 'Invalid username or password.';
          } else {
            this.loginError = 'An unexpected error occurred. Please try again later.';
          }
          return throwError(() => error);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe();
    }
  }



}
