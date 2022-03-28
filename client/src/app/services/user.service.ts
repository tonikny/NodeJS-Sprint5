import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { BehaviorSubject } from "rxjs";

import { User } from "../models/user";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _usuaris = new BehaviorSubject<User[]>([]);
  private llistaUsuaris: User[] = [];
  readonly usuaris = this._usuaris.asObservable();

  constructor(private socket: Socket) {}

  public obtenirUsuaris(): void {
    console.log('user.service - obtenirUsuaris ...');
    this.socket.fromEvent<User[]>('llista_usuaris').subscribe({
      next: (data: any) => {
        this.llistaUsuaris = data;
        this._usuaris.next(this.llistaUsuaris.map((obj) => ({ ...obj })));
      },
      error: () => console.log("No s'han pogut carregar els usuaris."),
    });
  }
}
