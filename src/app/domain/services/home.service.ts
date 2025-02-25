import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../enviroments/environment';
import { HomeServiceInterface } from '../interfaces/home-service.interface';

@Injectable({
  providedIn: 'root',
})
export class HomeService implements HomeServiceInterface {
  user = JSON.parse(localStorage.getItem('user') || '{}');
  private data: any | null = null;
  private apiUrl =
    environment.apiUrl + `/api/data-points?pdv=${this.user?.data?.pdv}`;

  constructor(private http: HttpClient) {}

  // Configurar los headers
  headers = new HttpHeaders({
    Authorization: `Bearer ${this.user?.data?.accessToken}`,
  });

  cardsData(): Observable<any> {
    return this.http.get<any>(this.apiUrl, { headers: this.headers }).pipe(
      tap((data: any) => {
        this.data = data;
        // console.log('Respuesta del servidor:', data);
      }),
      catchError((error: HttpErrorResponse) => {
        // Manejo de errores de la petición HTTP
        let errorMessage = 'Ocurrió un error desconocido';
        if (error.status === 404) {
          errorMessage = 'El usuario no existe.';
        } else if (error.status === 401) {
          errorMessage = 'Contraseña incorrecta.';
          localStorage.clear();
          location.reload();
        }
        return throwError(() => new Error(errorMessage));
      }),
    );
  }
}
