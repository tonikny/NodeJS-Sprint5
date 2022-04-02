import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Socket } from 'ngx-socket-io';

import { Sala } from '../models/sala';
import { AuthService } from './auth.service';

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
    this.eventSalaCreada();
  }

  public entrarASala(userId: number, salaId: number): void {
    //const userId = this.authService.getUserTokenData().userId;
    //this.salaActivaObs.pipe(take(1)).subscribe((value) => {
    this.salaActivaObs
      .pipe(tap((res) => console.log('RxJS entrarASala:', res)))
      .subscribe((value) => {
        this.salaActiva = value;
      });
    console.log('sala.service - salaActiva', this.salaActiva);
    if (userId) {
      console.log('sala.service - entra:', salaId, userId);
      this.socket.emit('entra_sala', userId, salaId.toString());
    } else {
      throw new Error('sala.service: No hi ha userId a sessionstorage');
    }
  }

  eventEntraASala() {
    this.socket
      .fromEvent<Sala>('sala_escollida')
      .pipe(tap((res) => console.log('RxJS - eventEntrarASala:', res)))
      .subscribe({
        next: (data: any) => {
          console.log('eventEntraASala-data', data);
          this.salaActiva = data;
          this._salaActiva.next(data);
          //this._salaActiva.complete();
          console.log('sala.service-Event-salaActiva', this.salaActiva);
        },
        error: () => console.log("No s'ha pogut entrar a la sala."),
      });
  }

  public obtenirSales(): void {
    console.log('sala.service - obtenirSales ...');
    this.socket
      .fromEvent<Sala[]>('llista_sales_resp')
      .pipe(tap((res) => console.log('RxJS obtenirSales:', res)))
      .subscribe({
        next: (data: any) => {
          this.llistaSales = data;
          this._sales.next(this.llistaSales.map((obj) => ({ ...obj })));
        },
        error: () => console.log("No s'han pogut carregar les sales."),
      });
  }

  crearSala(userId: number, nom: string) {
    this.socket.emit('crea_sala', userId, nom);
  }

  eventSalaCreada() {
    this.socket.fromEvent<Sala>('sala_creada_resp')
    .pipe(tap((res) => console.log('RxJS eventSalaCreada:', res)))
    .subscribe({
      next: (data: any) => {
        this.llistaSales.push(data);
        this._sales.next(this.llistaSales.map((obj) => ({ ...obj })));
      },
      error: () => console.log("No s'ha pogut crear la sala."),
    });
  }
}
