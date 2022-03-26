import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Missatge } from '../shared/missatge';
//import { SocketService } from '../shared/NO_socket.service';
import { Socket } from 'ngx-socket-io';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MissatgeService {
  //public message$: BehaviorSubject<Missatge[]> = new BehaviorSubject([]);
  private _missatges = new BehaviorSubject<Missatge[]>([]);
  // private llistaMissatges: Missatge[] = [];
  private dataStore: { missatges: Missatge[] } = { missatges: [] };
  readonly missatges = this._missatges.asObservable();


  constructor(private authService: AuthService, private socket: Socket) {}

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
    this.socket.fromEvent<Missatge>('nou_missatge_resp').subscribe({
      next: (data) => {
        this.dataStore.missatges.push(data);
        this._missatges.next(Object.assign({}, this.dataStore).missatges);
      },
      error: () => console.log('Could not create todo.'),
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
      },
      error: () => console.log("No s'han pogut carregar els missatges."),
    });
  }

  /* public onNouMissatge() {
    return this.socket.fromOneTimeEvent<Missatge>('nou_missatge_resp');
  } */
}
