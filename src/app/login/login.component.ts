import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { AuthService } from './services/auth.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor (public authService: AuthService) {};

}
