import { Component, signal, inject, NgZone } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],  
  imports: [
    ReactiveFormsModule
  ]
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private ngZone = inject(NgZone);
  email$ = new FormControl('');
  password$ = new FormControl('');
  errorMessage$ = signal<string | null>(null);

  async onRegister(event: Event) {
    event.preventDefault();
    try {
      await this.ngZone.run(() => this.authService.register(this.email$.getRawValue()?.trim() ?? '', this.password$.getRawValue()?.trim() ?? ''));
      this.router.navigate(['/tasks']);
    } catch (error: any) {
      this.errorMessage$.set('Registration failed' + error.message);
    }
  }
}
