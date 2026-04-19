import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly topNavLinks = [
    { label: 'View Trips', path: '/' },
    { label: 'Add Trip', path: '/add' },
    { label: 'Rooms', path: '/rooms' },
    { label: 'Meals', path: '/meals' },
    { label: 'News', path: '/news' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];
}
