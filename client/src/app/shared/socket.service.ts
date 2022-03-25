import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Missatge } from './missatge';
import { Sala } from './sala';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  public message$: BehaviorSubject<Missatge> = new BehaviorSubject(new Missatge());
  public sala$: BehaviorSubject<Sala> = new BehaviorSubject(new Sala());


  constructor() {}

  socket = io(environment.REST_SERVER_URL,{reconnection:false});



  /*   public sendMessage(messageText: any, salaId: number) {
    const userId = sessionStorage.getItem('userId');
    //const nom = sessionStorage.getItem('nom');
    const message: Missatge = new Missatge();
    message.text = messageText;
    message.salaId = salaId;
    message.userId = parseInt(userId!);
    this.socket.emit('missatge', message);
    console.log('socket.service - sendMessage:', message);
  }

  public getNewMessage = () => {
    this.socket.on('missatge', (message: Missatge) => {
      this.message$.next(message);
      console.log('socket.service - getNewMessage:', message);
    });

    return this.message$.asObservable();
  }; */
}
