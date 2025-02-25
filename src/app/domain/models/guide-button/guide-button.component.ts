import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../enviroments/environment';

@Component({
  selector: 'app-guide-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guide-button.component.html',
  styleUrls: ['./guide-button.component.css'],
})
export class GuideButtonComponent {
  showModal = false;
  imageSrc: string | null = null;
  imageDownload: string | null = null; // Mantener como cadena base64

  constructor(private http: HttpClient) {}

  user = JSON.parse(localStorage.getItem('user') || '{}');

  // Configurar los headers
  headers = new HttpHeaders({
    Authorization: `Bearer ${this.user?.data?.accessToken}`,
  });

  onGuideButtonClick() {
    this.http
      .get(environment.apiUrl + '/api/guide-files/pbm', { headers: this.headers })
      .subscribe(
        (response: any) => {
          this.imageSrc = `data:image/png;base64,${response.data.png}`;
          this.imageDownload = `data:image/pbm;base64,${response.data.pbm}`;
          this.showModal = true;
        },
        (error) => {
          console.error('Error al obtener la imagen de descarga', error);
        },
      );
  }

  closeModal() {
    this.showModal = false;
  }

  downloadImage() {
    if (this.imageDownload) {
      const a = document.createElement('a');
      a.href = this.imageDownload;
      a.download = 'guide-image.pbm';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }
}
