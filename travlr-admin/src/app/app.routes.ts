import { Routes } from '@angular/router';
import { TripListComponent } from './trip-list/trip-list.component';
import { TripForm } from './trip-form/trip-form.component';
import { StaticPageComponent } from './static-page/static-page.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: TripListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'add', component: TripForm, canActivate: [authGuard] },
  { path: 'rooms', component: StaticPageComponent, data: { section: 'rooms' } },
  { path: 'meals', component: StaticPageComponent, data: { section: 'meals' } },
  { path: 'news', component: StaticPageComponent, data: { section: 'news' } },
  { path: 'about', component: StaticPageComponent, data: { section: 'about' } },
  { path: 'contact', component: StaticPageComponent, data: { section: 'contact' } },
  { path: '**', redirectTo: '' },
];
