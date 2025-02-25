import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-acomulate-points',
  standalone: true,
  imports: [],
  templateUrl: './acomulate-points.component.html',
  styleUrl: './acomulate-points.component.css',
})
export class AcomulatePointsComponent implements OnChanges {
  @Input() pdv: {
    totalCurrent: number;
    totalPrevius: number;
  } = {
    totalCurrent: 0,
    totalPrevius: 0,
  };
  points: number = 0; // Puntos acumulados
  previusPoints: number = 0; // Puntos previos

  reloadPage() {
    window.location.reload();
  }

  ngOnChanges() {
    // console.log(this.pdv);
    if (this.pdv) {
      this.points = this.pdv.totalCurrent;
      this.previusPoints = this.pdv.totalPrevius;
    }
  }
}
