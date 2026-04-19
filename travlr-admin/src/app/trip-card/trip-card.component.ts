import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from '../trip.service';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.html',
  styleUrls: ['./trip-card.css'],
})
export class TripCardComponent {
  @Input({ required: true }) trip!: Trip;
  @Output() edit = new EventEmitter<Trip>();
  @Output() remove = new EventEmitter<string>();

  onEdit(): void {
    this.edit.emit(this.trip);
  }

  onDelete(): void {
    this.remove.emit(this.trip.code);
  }
}
