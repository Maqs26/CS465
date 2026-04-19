import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Trip } from '../trip.service';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css',
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

  imageSource(): string {
    const imagePath = this.trip.image || '';

    if (imagePath.startsWith('/images/')) {
      return `assets${imagePath}`;
    }

    if (imagePath.startsWith('images/')) {
      return `assets/${imagePath}`;
    }

    return imagePath;
  }
}
