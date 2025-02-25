import { Component, NgZone } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],  
  imports: [
    FormsModule
  ]
})
export class RegisterComponent {
  email$ = '';
  password$ = '';
  errorMessage$ = '';

  constructor(private authService: AuthService, private ngZone: NgZone) {}

  async onRegister() {
    try {
      await this.ngZone.run(() => this.authService.register(this.email$, this.password$));

    } catch (error) {
      this.errorMessage$ = 'Registration failed';
    } 
  }
}
