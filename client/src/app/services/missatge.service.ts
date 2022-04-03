import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Socket } from 'ngx-socket-io';

import { Missatge } from '../models/missatge';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MissatgeService {
  private _missatges = new BehaviorSubject<Missatge[]>([]);
  private dataStore: { missatges: Missatge[] } = { missatges: [] };
  readonly missatges = this._missatges.asObservable();

  constructor(private authService: AuthService, private socket: Socket) {
    this.eventMissatgeRebut();
  }

  public enviaMissatge(userId: number, messageText: any, salaId: number): void {
    const message: Missatge = {} as Missatge;
    message.text = messageText;
    message.salaId = salaId;
    message.userId = userId!;
    this.socket.emit('nou_missatge', message);
    //console.log('missatge.service - sendMessage:', message);
  }

  eventMissatgeRebut() {
    this.socket.fromEvent<Missatge>('nou_missatge_resp')
    //.pipe(tap((res) => console.log('RxJS eventMissatgeRebut:', res)))
    .subscribe({
      next: (data) => {
        this.dataStore.missatges.push(data);
        this._missatges.next(Object.assign({}, this.dataStore).missatges);
      },
      error: () => console.log('No s\'ha pogut enviar el missatge.'),
    });
  }

  public obtenirMissatges() {
    //console.log('missatge.service - obtenirMissatges ...');
    this.socket.fromEvent<Missatge[]>('llista_missatges')
    //.pipe(tap((res) => console.log('RxJS obtenirMissatges:', res)))
    .subscribe({
      next: (data: any) => {
        this.dataStore.missatges = data;
        this._missatges.next(Object.assign({}, this.dataStore).missatges);
      },
      error: () => console.log("No s'han pogut carregar els missatges."),
    });
  }

}
