import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'app-sidebar-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-card.component.html',
  styleUrl: './sidebar-card.component.css',
})
export class SidebarCardComponent implements OnInit {
  @Input() datos: {
    id: number;
    url: string;
    urlDorada: string;
    percentage: number;
    color: string;
    text: string;
    subtext: string;
  } = {
    id: 14,
    url: 'assets/NORMAL/LOGO-AMIGOS-GANE.png',
    urlDorada: 'assets/DORADOS/LOGO-AMIGOS-GANE-DORADO.png',
    percentage: 0,
    color: '#FFFFFF',
    text: 'calculando...',
    subtext: '',
  };
  strokeDashArray: string = '';
  dashOffset: string = '';

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const maxProgress = 100; // Limitar el progreso al 100% visualmente
    const progress = Math.min(this.datos.percentage, maxProgress); // Ajusta la lógica si necesitas manejar 115%
    const circumference = 2 * Math.PI * 60; // Radio del círculo
    this.strokeDashArray = `${circumference}`;
    this.dashOffset = `${circumference - (progress / 100) * circumference}`;

    this.cdr.detectChanges(); // Fuerza la detección de cambios
  }
}
