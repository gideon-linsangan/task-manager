import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    FormsModule]
})
export class LoginComponent {
  email$ = '';
  password$ = '';
  errorMessage$ = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onLogin() {
    try {
      await this.authService.login(this.email$, this.password$);
      this.router.navigate(['/tasks']);
    } catch (error) {
      this.errorMessage$ = 'Invalid email or password';
    }
  }
}
