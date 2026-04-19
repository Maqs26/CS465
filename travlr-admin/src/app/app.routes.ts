import { Routes } from '@angular/router';
import { TripListComponent } from './trip-list/trip-list.component';
import { TripForm } from './trip-form/trip-form.component';

export const routes: Routes = [
  { path: '', component: TripListComponent },
  { path: 'add', component: TripForm },
  { path: '**', redirectTo: '' }
];
