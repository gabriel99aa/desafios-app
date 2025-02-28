import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vertical-card-big',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vertical-card.component.html',
  styleUrls: ['./vertical-card.component.css'],
})
export class VerticalBigCardComponent implements OnChanges {
  // Propiedades de entrada
  @Input() puntos: number = 0;
  @Input() imagenUrl: string = '';
  @Input() imagenDoradaUrl: string = '';
  @Input() text: string = 'Text 1';
  @Input() subtext: string = 'SubText 2';
  @Input() color: string = '#000000';

  // Variables internas
  strokeDashArray: string = '';
  dashOffset: string = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['puntos']) {
      const maxProgress = 100;
      const progress = Math.min(this.puntos, maxProgress);
      const circumference = 2 * Math.PI * 60; // Radio del círculo
      this.strokeDashArray = `${circumference}`;
      this.dashOffset = `${circumference - (progress / 100) * circumference}`;
    }
  }
}
