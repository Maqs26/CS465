import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripService } from '../trip.service';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-list.html',
  styleUrls: ['./trip-list.css']
})
export class TripListComponent {
  readonly title = 'Travel';
  readonly trips;

  constructor(private readonly tripService: TripService) {
    this.trips = this.tripService.getTrips();
  }
}
