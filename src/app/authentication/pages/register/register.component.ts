import {Component} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthenticationService} from '../../service/authentication-service';
import {Router} from '@angular/router';
import {catchError, finalize} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatInput} from '@angular/material/input';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    MatCard,
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  registerError: string | null = null;
  isLoading = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const {email, username, password} = this.registerForm.value;
      this.isLoading = true;
      this.registerError = null;

      this.authService.register(email, username, password).pipe(
        catchError(this.handleError.bind(this)),
        finalize(() => this.isLoading = false)
      ).subscribe(() => this.router.navigate(['']));
    }
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Login error:', error);
    this.registerError = this.getErrorMessage(error);
    return throwError(() => error);
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      default:
        return 'An unexpected error occurred. Please try again later.';
    }
  }

}
