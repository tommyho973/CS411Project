import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'travel-app';
  constructor(private router: Router) {}

  // Method to navigate to the registration component
  navigateToRegistration() {
    this.router.navigate(['/register']);
  }
}
