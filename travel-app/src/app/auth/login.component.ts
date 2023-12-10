import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable,take } from 'rxjs';
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
    signInWithGoogle() {
      this.authService.signInWithGoogle()
        .then(() => {
          // Subscribe to authState to get the user information after sign-in
          this.authService.afAuth.authState
            .pipe(take(1)) // Take only the first emitted value (the current user state)
            .subscribe((user) => {
              if (user) {
                // User is defined, proceed with extracting information
                const uid = user.uid;
                const email = user.email || ''; // Use an empty string if email is undefined
                console.log(user.email);
                this.authService.sendUserInfoToMongoDB(uid, email)
                  .subscribe(
                    (response) => {
                      console.log('User registered and information sent to MongoDB:', response);
                    },
                    (error) => {
                      console.error('Failed to send user information to MongoDB:', error);
                    }
                  );
                this.router.navigate(['/home']);
              } else {
                console.error('User is undefined after registration.');
              }
            });
        })
        .catch(error => {
          this.router.navigate(['/home']);
        });
    }
    
  }