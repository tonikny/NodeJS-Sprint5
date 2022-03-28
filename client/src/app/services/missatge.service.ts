import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Socket } from 'ngx-socket-io';

import { Missatge } from '../models/missatge';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MissatgeService {
  //public message$: BehaviorSubject<Missatge[]> = new BehaviorSubject([]);
  private _missatges = new BehaviorSubject<Missatge[]>([]);
  // private llistaMissatges: Missatge[] = [];
  private dataStore: { missatges: Missatge[] } = { missatges: [] };
  readonly missatges = this._missatges.asObservable();


  constructor(private authService: AuthService, private socket: Socket) {
    this.eventMissatgeRebut();

  }

  /* public async enviaMissatge(messageText: any, salaId: number) {
    const userId = this.authService.getUserTokenData().userId;
    //const userId = sessionStorage.getItem('userId');
    //const nom = sessionStorage.getItem('nom');
    const message: Missatge = {} as Missatge;
    message.text = messageText;
    message.salaId = salaId;
    message.userId = parseInt(userId!);
    this.socket.emit('nou_missatge', message);
    console.log('missatge.service - sendMessage:', message);
    return await this.socket.fromOneTimeEvent<Missatge>('nou_missatge_resp');
  } */
  public enviaMissatge(messageText: any, salaId: number): void {
    const userId = this.authService.getUserTokenData().userId;
    const message: Missatge = {} as Missatge;
    message.text = messageText;
    message.salaId = salaId;
    message.userId = parseInt(userId!);

    this.socket.emit('nou_missatge', message);
    console.log('missatge.service - sendMessage:', message);
  }

  eventMissatgeRebut() {
    this.socket.fromEvent<Missatge>('nou_missatge_resp').subscribe({
      next: (data) => {
        this.dataStore.missatges.push(data);
        this._missatges.next(Object.assign({}, this.dataStore).missatges);
      },
      error: () => console.log('No s\'ha pogut enviar el missatge.'),
    });
  }

/*   public getNewMessage2 = () => {
    this.socket.on('missatges', (message: any) => {
      this._missatge.next(message);
      console.log(
        'missatge.service - getNewMessage:',
        message,
        this.message$.value
      );
    });
    return this.message$.asObservable();
  }; */
  /* public obtenirMissatges(): Observable<Missatge[]> {
    console.log('missatge.service - obtenirMissatges ...');
    return this.socket.fromEvent<Missatge[]>('llista_missatges');
  } */
  public obtenirMissatges() {
    console.log('missatge.service - obtenirMissatges ...');
    this.socket.fromEvent<Missatge[]>('llista_missatges').subscribe({
      next: (data: any) => {
        this.dataStore.missatges = data;
        this._missatges.next(Object.assign({}, this.dataStore).missatges);
        //this._missatges.next(this.dataStore.missatges.map(obj => ({...obj})));
      },
      error: () => console.log("No s'han pogut carregar els missatges."),
    });
  }

  /* public onNouMissatge() {
    return this.socket.fromOneTimeEvent<Missatge>('nou_missatge_resp');
  } */
}
