import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { io } from "socket.io-client";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class XatService {

  public message$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private http: HttpClient) {}

  socket = io('http://localhost:3001/');

  public sendMessage(message: any) {
    this.socket.emit('message', message);
  }

  public getNewMessage = () => {
    this.socket.on('message', (message) =>{
      this.message$.next(message);
    });
    return this.message$.asObservable();
  };

  async provaGetRestApi() {
    const url = environment.REST_SERVER_URL + 'sales';

    this.http.get(url).subscribe((res)=>{
      console.log(res);
    });
    
    /* const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(res.json); */
  }
}