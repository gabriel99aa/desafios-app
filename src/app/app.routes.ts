import { Routes } from '@angular/router';
import { LoginComponent } from './infrastructure/views/login/login.component';
import { HomeComponent } from './infrastructure/views/home/home.component';
import { AuthGuard } from './infrastructure/guards/auth.guard'; // Importa el guard
import { LoginGuard } from './infrastructure/guards/login.guard';

export const routes: Routes = [
  // Ruta protegida con el guard AuthGuard
  { path: '', component: HomeComponent, canActivate: [AuthGuard] }, // Protege la ruta de inicio
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] }, // Protege la ruta de login

  // Redirige a 'login' si la ruta no es válida
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
