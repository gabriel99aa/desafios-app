import { Observable } from 'rxjs';

export interface HomeServiceInterface {
  cardsData(): Observable<any>;
}
