import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Trip, TripService } from '../trip.service';

@Component({
  selector: 'app-trip-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trip-form.html',
  styleUrl: './trip-form.css',
})
export class TripForm implements OnInit {
  private readonly tripService = inject(TripService);
  private readonly router = inject(Router);

  originalCode = '';
  isEditing = false;
  errorMessage = '';

  trip: Trip = {
    name: '',
    code: '',
    length: 1,
    start: '',
    resort: '',
    perPerson: 0,
    image: 'assets/images/reef1.jpg',
    description: '',
  };

  ngOnInit(): void {
    const navTrip = history.state?.trip as Trip | undefined;
    if (navTrip?.code) {
      this.trip = { ...navTrip };
      this.originalCode = navTrip.code;
      this.isEditing = true;
    }
  }

  saveTrip(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const action = this.isEditing
      ? this.tripService.updateTrip(this.originalCode, this.trip)
      : this.tripService.addTrip(this.trip);

    action.subscribe({
      next: () => this.router.navigate(['/']),
      error: () => {
        this.errorMessage = this.isEditing
          ? 'Unable to update the trip.'
          : 'Unable to add the trip.';
      },
    });
  }
}
