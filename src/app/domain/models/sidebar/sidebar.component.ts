import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SidebarCardComponent } from '../sidebar-card/sidebar-card.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarCardComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnChanges {
  @Input() fd: {
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
  isCompleted: boolean = false;
  NoCompletedImg = 'assets/PLAN-DE-PREMIOS-Y-AMIGOS-GANE.png';
  CompletedImg = 'assets/PLAN-DE-PREMIOS-Y-AMIGOS-GANE-DORADO.png';

  ngOnChanges() {
    this.isCompleted = this.fd.percentage >= 100 ? true : false;
  }
}
