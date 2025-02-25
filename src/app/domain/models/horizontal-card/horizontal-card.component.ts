import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-horizontal-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './horizontal-card.component.html',
  styleUrls: ['./horizontal-card.component.css'],
})
export class HorizontalCardComponent implements OnChanges {
  @Input() puntos: number = 0;
  @Input() imagenUrl: string = '';
  @Input() imagenDoradaUrl: string = '';
  @Input() color: string = '';
  @Input() text: string = 'Text 1';
  @Input() subtext: string = 'SubText 2';

  // Variable para almacenar el valor del atributo stroke-dasharray para el círculo de progreso.
  strokeDashArray: string = '';

  // Variable para almacenar el valor del atributo stroke-dashoffset para el círculo de progreso.
  dashOffset: string = '';

  // Método que se ejecuta cuando cambian las propiedades de entrada del componente.
  ngOnChanges() {
    const progress = Math.min(this.puntos, 100); // Ajusta el máximo si es necesario
    const circumference = 2 * Math.PI * 60; // Radio del círculo
    this.strokeDashArray = `${circumference}`;
    this.dashOffset = `${circumference - (progress / 100) * circumference}`; // Ajusta según el máximo permitido
  }
}
