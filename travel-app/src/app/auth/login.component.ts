import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-login',
    template: `
      <div>
        <h2>Login</h2>
        <form (ngSubmit)="login()">
          <label for="email">Email:</label>
          <input type="email" id="email" name = "email" [(ngModel)]="email" required>
  
          <label for="password">Password:</label>
          <input type="password" id="password" name = "password" [(ngModel)]="password" required>
  
          <button type="submit">Login</button>
        </form>
      </div>
    `,
  })
  export class LoginComponent {
    email: string = '';
    password: string = '';
  
    constructor(private authService: AuthService) {}
  
    login() {
      this.authService.loginWithEmailPassword(this.email, this.password)
        .then(() => {
          // Handle successful login, e.g., navigate to a different page
          console.log("Success");
        })
        .catch(error => {
          // Handle login error (display error message, etc.)
          console.error('Login error:', error.message);
        });
    }
  }