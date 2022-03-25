import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Missatge } from '../shared/missatge';
import { SocketService } from '../shared/socket.service';
import { Socket } from 'ngx-socket-io';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MissatgeService {
  public message$: BehaviorSubject<Missatge> = new BehaviorSubject(
    new Missatge()
  );
  //socket = io(environment.REST_SERVER_URL);

  constructor(private authService: AuthService,private socket: Socket) {}

  public async enviaMissatge(messageText: any, salaId: number) {
    const userId = this.authService.getUserTokenData().userId;
    //const userId = sessionStorage.getItem('userId');
    //const nom = sessionStorage.getItem('nom');
    const message: Missatge = new Missatge();
    message.text = messageText;
    message.salaId = salaId;
    message.userId = parseInt(userId!);
    this.socket.emit('nou_missatge', message);
    console.log('missatge.service - sendMessage:', message);
    return await this.socket.fromOneTimeEvent<Missatge>('nou_missatge_resp');
  }

  public getNewMessage2 = () => {
    this.socket.on('missatges', (message: any) => {
      this.message$.next(message);
      console.log(
        'missatge.service - getNewMessage:',
        message,
        this.message$.value
      );
    });
    return this.message$.asObservable();
  };
  public obtenirMissatges(): Observable<Missatge[]> {
    console.log('missatge.service - obtenirMissatges ...');
    return this.socket.fromEvent<Missatge[]>('llista_missatges');
  }

  public onNouMissatge() {
    return this.socket.fromOneTimeEvent<Missatge>('nou_missatge_resp');
  }
}
