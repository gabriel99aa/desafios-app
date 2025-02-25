import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css',
})
export class InfoComponent {
  username: string = ''; // Nombre del usuario
  location?: string; // Campo opcional
  date: string = ''; // Fecha

  ngOnInit() {
    // Obtener el objeto del localStorage
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      this.username = `${user.data.user.name} ${user.data.user.lastName}`;

      // Si pdvName está presente, lo asignamos a location
      if (user.data.pdvName) {
        this.location = user.data.pdvName;
      }
    }

    // Obtener la fecha actual del sistema y formatearla
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    this.date = now.toLocaleDateString('es-ES', options); // Formato: "hoy 10 de mayo de 2024"
  }
}
