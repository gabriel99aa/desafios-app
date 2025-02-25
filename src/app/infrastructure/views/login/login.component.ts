import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../domain/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  usuario = '';
  clave = '';
  isLoading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit(e: Event): void {
    e.preventDefault();
    this.isLoading = true;
    this.errorMessage = '';

    if (!this.usuario || !this.clave) {
      this.errorMessage = 'Por favor ingrese su usuario y contraseña.';
      this.isLoading = false;
      return;
    }

    this.authService.login(this.usuario, this.clave).subscribe({
      next: (user: any) => {
        this.isLoading = false;

        localStorage.setItem('user', JSON.stringify(user));

        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error al iniciar sesión:', err);
        this.isLoading = false;
        if (err.message === 'El usuario no existe.') {
          this.errorMessage =
            'El correo electrónico ingresado no está registrado.';
        } else if (err.message === 'Contraseña incorrecta.') {
          this.errorMessage = 'La contraseña ingresada es incorrecta.';
        } else {
          this.errorMessage =
            'Error al iniciar sesión. Por favor intente nuevamente.';
        }
      },
    });
  }
}
