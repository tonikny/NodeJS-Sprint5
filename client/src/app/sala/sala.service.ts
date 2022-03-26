import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError, retry, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Sala } from '../shared/sala';
import { Socket } from 'ngx-socket-io';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SalaService {
  private _sales = new BehaviorSubject<Sala[]>([]);
  private llistaSales: Sala[] = [];
  //private dataStore: { sales: Sala[] } = { sales: [] };
  readonly sales = this._sales.asObservable();

  private _salaActiva = new BehaviorSubject<Sala>({} as Sala);
  salaActivaObs = this._salaActiva.asObservable();
  salaActiva: Sala | undefined;


  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private socket: Socket
  ) {
    this.eventEntraASala();
  }


  public entrarASala(salaId: number): void {
    const userId = this.authService.getUserTokenData().userId;
    this.salaActivaObs.pipe(take(1)).subscribe((value) => {
      this.salaActiva = value;
    });
    console.log('sala.service - salaActiva', this.salaActiva);      
    if (userId) {
      console.log('sala.service - entra:', salaId, parseInt(userId));
      this.socket.emit('entra_sala', salaId.toString());
    } else {
      throw new Error('sala.service: No hi ha userId a sessionstorage');
    }
  }

  eventEntraASala() {
    this.socket.fromEvent<Sala>('sala_escollida').subscribe({
      next: (data: any) => {
        this.salaActiva = data;
        this._salaActiva.next(data);
        //this._salaActiva.complete();
        console.log('sala.service-salaActiva', this.salaActiva);
      },
      error: () => console.log("No s'ha pogut entrar a la sala."),
    });
  }

  public obtenirSales(): void {
    console.log('missatge.service - obtenirSales ...');
    this.socket.fromEvent<Sala[]>('llista_sales_resp').subscribe({
      next: (data: any) => {
        this.llistaSales = data;
        this._sales.next(this.llistaSales.map((obj) => ({ ...obj })));
      },
      error: () => console.log("No s'han pogut carregar les sales."),
    });
  }

  /* load(id: number | string) {
    this.http.get<Todo>(`${this.baseUrl}/todos/${id}`).subscribe(
      data => {
        let notFound = true;

        this.dataStore.todos.forEach((item, index) => {
          if (item.id === data.id) {
            this.dataStore.todos[index] = data;
            notFound = false;
          }
        });

        if (notFound) {
          this.dataStore.todos.push(data);
        }

        this._todos.next(Object.assign({}, this.dataStore).todos);
      },
      error => console.log('Could not load todo.')
    );
  } */
}
