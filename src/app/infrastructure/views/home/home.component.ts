import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../domain/models/sidebar/sidebar.component';
import { VerticalCardComponent } from '../../../domain/models/vertical-card/vertical-card.component';
import { HorizontalCardComponent } from '../../../domain/models/horizontal-card/horizontal-card.component';
import { GuideButtonComponent } from '../../../domain/models/guide-button/guide-button.component';
import { AcomulatePointsComponent } from '../../../domain/models/acomulate-points/acomulate-points.component';
import { InfoComponent } from '../../../domain/models/info/info.component';
import { LogoutComponent } from '../../../domain/models/logout/logout.component';
import { HomeService } from '../../../domain/services/home.service';
import { loading, logosObjects } from '.';
import { FooterComponent } from '../../../domain/models/footer/footer.component';
import { VerticalBigCardComponent } from '../../../domain/models/vertical-card-big/vertical-card.component';

interface Marca {
  id: number;
  name?: string;
  url: string;
  urlDorada: string;
  percentage: number;
  color: string;
  text: string;
  subtext: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    VerticalCardComponent,
    VerticalBigCardComponent,
    HorizontalCardComponent,
    GuideButtonComponent,
    AcomulatePointsComponent,
    InfoComponent,
    LogoutComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isLoading = false;
  errorMessage = '';
  marca: Marca[] = loading;
  logos = logosObjects;
  fd = loading[loading.length - 1];
  pdv: {
    totalCurrent: number;
    totalPrevius: number;
  } = {
    totalCurrent: 0,
    totalPrevius: 0,
  };

  constructor(
    private homeService: HomeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    type LogoKey =
      | 'ch'
      | 'dc'
      | 'cm'
      | 'pm'
      | 'sg'
      | 'lf'
      | 'lv'
      | 'rp'
      | 'bl'
      // | 'as'
      | 'bp'
      | 'pg'
      | 'rg'
      | 'sp'
      | 'fd'
      | 'cs';

    this.homeService.cardsData().subscribe({
      next: (cards) => {
        this.isLoading = false;

        // Paso 1: Filtramos el array para eliminar "as", "cs", y "sg" temporalmente
        let cleanCards = cards?.data[0].filter(
          (elements: any) =>
            elements.idj !== 'as' &&
            elements.idj !== 'cs' &&
            elements.idj !== 'sg'
        );

        // Paso 2: Encontrar las posiciones de "pm" y "bl" en el array filtrado
        const indexPm = cleanCards.findIndex((item: any) => item.idj === 'pm');
        const indexBl = cleanCards.findIndex((item: any) => item.idj === 'bl');

        // Paso 3: Crear referencias a los elementos "cs" y "sg"
        const csElement = cards?.data[0].find((item: any) => item.idj === 'cs');
        const sgElement = cards?.data[0].find((item: any) => item.idj === 'sg');

        // Paso 4: Insertar "cs" después de "pm" si ambos existen
        if (indexPm !== -1 && csElement) {
          cleanCards.splice(indexPm + 1, 0, csElement);
        }

        // Paso 5: Insertar "sg" después de "bl" en el array actualizado si ambos existen
        if (indexBl !== -1 && sgElement) {
          cleanCards.splice(indexBl + 2, 0, sgElement); // +2 para compensar el posible índice corrido tras agregar "cs"
        }

        const data = [cleanCards, cards?.data[1], cards?.data[2]];

        localStorage.setItem('cards', JSON.stringify(data));
        this.marca = data[0]?.map(
          (
            obj: {
              idj: LogoKey;
              percentage: number;
              color: string;
              title: string;
              subtitle: string;
            },
            index: number
          ) => ({
            id: index,
            name: obj?.idj,
            url: this.logos[obj?.idj]?.url,
            urlDorada: this.logos[obj?.idj]?.urlDorada,
            percentage: Math.trunc(obj?.percentage),
            color: obj?.color,
            text: obj?.title,
            subtext: obj?.subtitle,
          })
        );
        this.fd = this.marca[this.marca.length - 1];
        this.pdv = data[2];
        this.cdr.markForCheck();

        console.log('this.marca: ', this.marca);
      },
      error: (err) => {
        console.error('Error al obtener datos:', err);
        this.isLoading = false;
        this.errorMessage = err.message;
      },
    });
  }
}
