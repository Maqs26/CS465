import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <h1>Travlr Admin</h1>

    <a routerLink="/">View Trips</a> |
    <a routerLink="/add">Add Trip</a>

    <hr>

    <router-outlet></router-outlet>
  `
})
export class App {}