import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  })
  export class LoginComponent {
    email: string = '';
    password: string = '';
  
    constructor(private authService: AuthService, private router:Router) {}
  
    login() {
      this.authService.loginWithEmailPassword(this.email, this.password)
        .then(() => {
          // Handle successful login, e.g., navigate to a different page
          console.log("Success");
          this.router.navigate(['/home']);
        })
        .catch(error => {
          // Handle login error (display error message, etc.)
          console.error('Login error:', error.message);
        });
    }
    signInWithGoogle(){
      this.authService.signInWithGoogle()
      .then(() => {
        // Handle successful login, e.g., navigate to a different page
        console.log("Success");
        this.router.navigate(['/home']);
      })
      .catch(error => {
        // Handle login error (display error message, etc.)
        console.error('Login error:', error.message);
      });
    }
  }