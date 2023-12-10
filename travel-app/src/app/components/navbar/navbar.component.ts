import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn$ = this.authService.isLoggedIn$;

  constructor(public authService: AuthService, private router: Router) {}

  logout(): void {
    // function to log out user
    this.authService.logout().then(() => {
      this.router.navigate(['/login']); // Navigate to login after logout
    });
  }
}
