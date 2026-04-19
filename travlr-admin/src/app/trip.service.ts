import { Injectable } from '@angular/core';

export interface Trip {
  name: string;
  code: string;
  length: number;
  start: string;
  resort: string;
  perPerson: number;
  image: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private readonly trips: Trip[] = [
    {
      name: "Gale Reef",
      code: "GALE-REEF",
      length: 7,
      start: "2026-06-15",
      resort: "Emerald Bay",
      perPerson: 899,
      image: "assets/images/reef1.jpg",
      description: "Beautiful reef with amazing views."
    },
    {
      name: "Dawson's Reef",
      code: "DAWSON-REEF",
      length: 5,
      start: "2026-07-10",
      resort: "Blue Lagoon",
      perPerson: 699,
      image: "assets/images/reef2.jpg",
      description: "Crystal clear water and marine life."
    },
    {
      name: "Claire's Reef",
      code: "CLAIRE-REEF",
      length: 4,
      start: "2026-08-20",
      resort: "Coral Sands",
      perPerson: 599,
      image: "assets/images/reef3.jpg",
      description: "Perfect for diving and exploration."
    }
  ];

  getTrips(): Trip[] {
    return this.trips;
  }
}
