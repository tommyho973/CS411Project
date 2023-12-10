import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-account',
  styleUrls: ['./account.component.css'],
  template: `
    <div class="container" *ngIf="authService.user$ | async as user">
      <div id="desc">
        <h2>Account Information</h2>
        <p>Email: {{ user.email }}</p>
      </div>
      <button (click)="logout()">Logout</button>
    </div>
    <!-- <div *ngIf="!(authService.user$ | async)">
      <p>Please log in or register.</p>
    </div> -->
  `,
})
export class AccountComponent {
  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}