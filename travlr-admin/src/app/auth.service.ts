import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface LoginResponse {
  token: string;
  user: {
    name: string;
    username: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = 'http://localhost:3000/api';
  private readonly tokenKey = 'travlr_admin_token';

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiBaseUrl}/login`, { username, password })
      .pipe(tap((response) => localStorage.setItem(this.tokenKey, response.token)));
  }

  register(name: string, username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiBaseUrl}/register`, { name, username, password })
      .pipe(tap((response) => localStorage.setItem(this.tokenKey, response.token)));
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string {
    return localStorage.getItem(this.tokenKey) ?? '';
  }

  isLoggedIn(): boolean {
    return this.getToken().length > 0;
  }
}
