import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  credentials = {
    username: '',
    password: '',
  };

  errorMessage = '';

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    this.authService.login(this.credentials.username, this.credentials.password).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => {
        this.errorMessage = 'Login failed. Check your username and password.';
      },
    });
  }
}
