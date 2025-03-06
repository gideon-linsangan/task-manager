import { Component, signal, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { RouterModule } from '@angular/router';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  user = signal<User | null>(null);
  constructor() {
    effect(() => {
      this.authService.user$.subscribe(newUser => {
        this.user.set(newUser)
      });
    });
  }
  title = 'task-manager';

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
