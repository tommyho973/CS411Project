import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
  })
  export class RegisterComponent {
    email: string = '';
    password: string = '';
  
    constructor(private authService: AuthService, private router:Router) {}
    register() {
        this.authService.registerWithEmailPassword(this.email, this.password)
          .then((userCredential) => {
            const user = userCredential.user;
      
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
                this.router.navigate(['/login']);
            } else {
              console.error('User is undefined after registration.');
            }
          })
          .catch(error => {
            console.error('Registration error:', error.message);
          });
      }
  }