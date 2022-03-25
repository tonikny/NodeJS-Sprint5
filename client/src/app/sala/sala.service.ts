import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
//import { SocketService } from '../shared/socket.service';
import { Sala } from '../shared/sala';
//import { io } from 'ngx-socket-io';
//import * as io from 'socket.io-client';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
//import { io } from 'socket.io-client';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SalaService {
  //public sala$: BehaviorSubject<Sala> = new BehaviorSubject(new Sala());
  //socket (environment.REST_SERVER_URL, config);
  //socket: Socket;
  //private token: string | null;

  constructor(
    private http: HttpClient,
    //private socketService: SocketService,
    private authService: AuthService,
    private socket: Socket
  ) {
    // const config: SocketIoConfig = {
    //   url: environment.REST_SERVER_URL,
    // options: {
    //   transports: ['websocket'],
    //   //autoConnect: false,
    //   //upgrade: true,
    //   query: {
    //     'x-token': sessionStorage.getItem('access_token'),
    //   },
    // },
    // };
    //this.socket = new Socket(config);

    //this.token = this.authService.getToken();
    console.log('sala.service-constructor');

    //this.socket.ioSocket.io.opts.query = { Authorization: `Bearer ${this.token}` };
    //this.socket.ioSocket.io.opts.query = { 'x-token': `${this.token}` };
  }

  /* public entrarASala(salaId: number): Promise<Sala> {
    //const userId = sessionStorage.getItem('userId');
    const userId = this.authService.getUserTokenData().userId;
    if (userId) {
      console.log('sala.service - entra:', salaId, parseInt(userId));
      this.socket.emit(
        'entra',
        salaId.toString(),
        (response: Sala | undefined) => {
          console.log(response);
        }
      );
      return this.socket.fromOneTimeEvent<Sala>('sala');
    } else {
      throw new Error('sala.service: No hi ha userId a sessionstorage');
    }
  } */
  public entrarASala(salaId: number): Promise<Sala> {
    //const userId = sessionStorage.getItem('userId');
    const userId = this.authService.getUserTokenData().userId;
    if (userId) {
      console.log('sala.service - entra:', salaId, parseInt(userId));
      this.socket.emit(
        'entra',
        salaId.toString(),
        (response: Sala | undefined) => {
          console.log(response);
        }
      );
      return this.socket.fromOneTimeEvent<Sala>('sala');
    } else {
      throw new Error('sala.service: No hi ha userId a sessionstorage');
    }
  }

  public obtenirSales(): Observable<Sala[]> {
    /*     return this.socket.on('llista_sales', (data: Sala) => {
      console.log('data', data);
      return data;
    });
 */
    return this.socket.fromEvent<Sala[]>('llista_sales');

    /*  this.socket.on('llista_sales', (sala: Sala) => {
      this.sala$.next(sala);
      console.log('sala.service - obtenirSales:', sala);
    });
    return this.sala$.asObservable(); */
  }

  public async obtenirSales2 () {
    this.socket.emit('llista_sales');
    return await this.socket.fromOneTimeEvent<Sala[]>('llista_sales_resp');

  }

  /*   obtenirSales(){
    let observable = new Observable<Sala>(observer=>{
      this.socket.on('llista_sales', (data)=>{
        observer.next(data);
      });
      return () => {this.socket.disconnect();}
    });
    return observable;
  } */
}


// export interface Sala {
//   id?: number;
//   nom: string;
//   descripcio?: string;
//   nombreUsuaris: number;
// }
