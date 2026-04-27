import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { Trip, TripService } from '../trip.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-list.html',
  styleUrls: ['./trip-list.css'],
})
export class TripListComponent implements OnInit {
  readonly title = 'Travlr Getaways Admin';
  trips: Trip[] = [];
  errorMessage = '';

  private readonly tripService = inject(TripService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.loadTrips();
  }

  loadTrips(): void {
    this.tripService.getTrips().subscribe({
      next: (trips) => {
        this.trips = trips;
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Unable to load trips. Make sure the API server is running.';
      },
    });
  }

  canEdit(): boolean {
    return this.authService.isLoggedIn();
  }

  editTrip(trip: Trip): void {
    if (!this.canEdit()) {
      this.router.navigate(['/login']);
      return;
    }

    this.router.navigate(['/add'], { state: { trip } });
  }

  deleteTrip(code: string): void {
    if (!this.canEdit()) {
      this.router.navigate(['/login']);
      return;
    }

    this.tripService.deleteTrip(code).subscribe({
      next: () => this.loadTrips(),
      error: () => {
        this.errorMessage = `Unable to delete trip ${code}.`;
      },
    });
  }
}
