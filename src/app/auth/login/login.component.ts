import { Component, signal, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    ReactiveFormsModule
  ]
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  email$ = new FormControl('');
  password$ = new FormControl('');
  errorMessage$ = signal<string | null>(null);

  async onLogin(event: Event) {
    event.preventDefault();
    const emailValue = this.email$.getRawValue()?.trim() ?? '';
    const passwordValue = this.password$.getRawValue()?.trim() ?? '';

    if (!emailValue || !passwordValue) {
      this.errorMessage$.set('Email and password are required.');
      return;
    }
    try {
      await this.authService.login(emailValue, passwordValue);
      this.router.navigate(['/tasks']);
    } catch (error: any) {
      console.error(error);
      this.errorMessage$.set(error.message || 'Invalid email or password');
    }
  }
}
