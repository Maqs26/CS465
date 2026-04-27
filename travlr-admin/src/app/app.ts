import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly topNavLinks = [
    { label: 'View Trips', path: '/' },
    { label: 'Add Trip', path: '/add' },
    { label: 'Rooms', path: '/rooms' },
    { label: 'Meals', path: '/meals' },
    { label: 'News', path: '/news' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
