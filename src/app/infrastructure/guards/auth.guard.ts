import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../domain/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    const userString = localStorage.getItem('user');

    if (userString) {
      const user = JSON.parse(userString);
      if (user && user.data.accessToken) {
        return true; // Permite el acceso a la ruta
      }
    }

    this.router.navigate(['/login']); // Redirige al login si no está autenticado
    return false;
  }
}
