import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MissatgeService {
  public message$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() {}

  socket = io(environment.REST_SERVER_URL);

  public sendMessage(message: any, salaId: number) {
    const userId = sessionStorage.getItem('userId');
    const nom = sessionStorage.getItem('nom');
    this.socket.emit('message', message, salaId, userId, nom);
  }

  public getNewMessage = () => {
    this.socket.on('message', (message) => {
      this.message$.next(message);
    });
    return this.message$.asObservable();
  };
}
