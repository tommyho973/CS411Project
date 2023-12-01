import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-register',
    template: `
      <div>
        <h2>Register</h2>
        <form (submit)="register()">
          <label for="email">Email:</label>
          <input type="email" id="email" name = "email" [(ngModel)]="email" required>
  
          <label for="password">Password:</label>
          <input type="password" id="password" name = "password" [(ngModel)]="password" required>
  
          <button type="submit">Register</button>
        </form>
      </div>
    `,
  })
  export class RegisterComponent {
    email: string = '';
    password: string = '';
  
    constructor(private authService: AuthService) {}
    register() {
        this.authService.registerWithEmailPassword(this.email, this.password)
          .then((userCredential) => {
            const user = userCredential.user;
      
            if (user) {
              // User is defined, proceed with extracting information
              const uid = user.uid;
              const displayName = user.displayName || ''; // Use an empty string if displayName is undefined
              const email = user.email || ''; // Use an empty string if email is undefined
      
              this.authService.sendUserInfoToMongoDB(uid, displayName, email)
                .subscribe(
                  (response) => {
                    console.log('User registered and information sent to MongoDB:', response);
                  },
                  (error) => {
                    console.error('Failed to send user information to MongoDB:', error);
                  }
                );
            } else {
              console.error('User is undefined after registration.');
            }
          })
          .catch(error => {
            console.error('Registration error:', error.message);
          });
      }
  }