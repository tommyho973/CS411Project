import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public authService: AuthService) {}

  isLoggedIn(): boolean {
    // function will check if the user is logged in currently
    // return this.authService.isLoggedIn();
    return true;
  }

  logout(): void {
    // function to log out user
    // this.authService.logout();
  }
}
