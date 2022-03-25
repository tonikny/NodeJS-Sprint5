/* import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket!: any;

  constructor() {}

  connect(token: string): Subject<MessageEvent> {
    this.socket = io(environment.REST_SERVER_URL, {
      query: { token },
    });

    // We define our observable which will observe any incoming messages
    // from our socket.io server.
    let observable = new Observable((observer) => {
      this.socket.on('message', (data: unknown) => {
        console.log('Received message from Websocket Server');
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });

    // We define our Observer which will listen to messages
    // from our other components and send messages back to our
    // socket server whenever the `next()` method is called.
    let observer = {
      next: (data: Object) => {
        this.socket.emit('message', JSON.stringify(data));
      },
    };

    // we return our Rx.Subject which is a combination
    // of both an observer and observable.
    return Subject.create(observer, observable);
  }
}
 */
/* 
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  constructor(private socket: Socket, private authService: AuthService) {
    //const currentUser 
    const token = this.authService.getToken();
    this.socket.ioSocket.io.opts.query = { 'x-token': `${token}` };
  }

  // public sendMessage(event: string, message: any) {
  //   this.socket.emit(event, message);
  // }

  // public getMessage(eventName: string) {
  //   return new Observable(observer => {
  //     this.socket.on(eventName, (message: unknown) => {
  //       observer.next(message);
  //     });
  //   });
  // }
}
 */

import { AuthService } from './auth.service';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

export class MySocket extends Socket {
    constructor(
        private authService: AuthService,
    ) {
        super({ url: environment.REST_SERVER_URL, options: {} });
        this.ioSocket['auth'] = { token: this.authService.getToken() };
    }
}