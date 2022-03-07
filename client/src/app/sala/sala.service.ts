import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SalaService {

  constructor(private http: HttpClient) {}

  //FIXME: treure la prova
  provaGetRestApi() {
    const url = environment.REST_SERVER_URL + 'sales';

    this.http.get(url).subscribe((res) => {
      console.log(res);
    });
  }

  getSales(): Observable<Sala[]> {
    const url = environment.REST_SERVER_URL + 'sales';
    return this.http.get<Sala[]>(url).pipe(
      catchError((err) => {
        console.error(err);
        throw err;  
      })
    );
  }
}

export interface Sala {
  id?: number;
  nom: string;
  nombreUsuaris: number;
}
