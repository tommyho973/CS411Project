import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-account',
  template: `
    <div *ngIf="authService.user$ | async as user">
      <h2>Account Information</h2>
      <p>Email: {{ user.email }}</p>
      <button (click)="logout()">Logout</button>
    </div>
    <div *ngIf="!(authService.user$ | async)">
      <p>Please log in or register.</p>
    </div>
  `,
})
export class AccountComponent {
  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}