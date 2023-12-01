import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-logout',
  template: `
    <div>
      <h2>Logout</h2>
      <button (click)="logout()">Logout</button>
    </div>
  `,
})
export class LogoutComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}