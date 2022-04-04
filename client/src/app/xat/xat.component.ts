import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, shareReplay, take, tap } from 'rxjs';
import { Router } from '@angular/router';

import { MissatgeService } from '../services/missatge.service';
import { SalaService } from '../services/sala.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Missatge } from '../models/missatge';
import { Sala } from '../models/sala';

@Component({
  selector: 'app-xat',
  templateUrl: './xat.component.html',
  styleUrls: ['./xat.component.scss'],
})
export class XatComponent implements OnInit, OnDestroy {
  @ViewChild('scrollMe', { read: ElementRef, static: false })
  private scrollContainer: ElementRef = {} as ElementRef;

  usuari!: User;
  llistaSales = new Observable<Sala[]>();
  salaActivaObs = new Observable<Sala>();
  salaActiva: Sala | undefined;
  newMessage: Missatge = {} as Missatge;
  llistaMissatges!: Observable<Missatge[]>;
  llistaUsuaris!: Observable<User[]>;
  mostraInput = false;
  nomSalaNova = '';
  usuariObs!: Observable<User>;

  constructor(
    private router: Router,
    private salaService: SalaService,
    private missatgeService: MissatgeService,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.obtenirUser();
  }
  
  ngOnInit(): void {
    this.llistaSales = this.salaService.sales; // subscribe to entire collection
    this.salaService.obtenirSales(); // load all sales
    this.salaActivaObs = this.salaService.salaActivaObs; // subscribe

    this.llistaMissatges = this.missatgeService.missatges; // subscribe to entire collection
    this.missatgeService.obtenirMissatges(); // load all missatges

    this.llistaUsuaris = this.userService.usuaris.pipe(shareReplay()); // subscribe to entire collection
    this.userService.obtenirUsuaris(); // load all usuaris
  }

  obtenirUser() {
    const token = this.authService.getUserTokenData();
    //console.log('obtenirUser-token', token);
    const userId = token.userId;
    this.usuariObs = this.authService.getUser(userId).pipe(shareReplay());
    this.usuariObs
      .pipe(
        take(1)
        //tap((res) => console.log('RxJS - xat -obtenirUser:', res))
      )
      .subscribe({
        next: (user: any) => {
          this.usuari = user;
        },
        error: () => {
          console.log("No s'ha pogut obtenir l'usuari!!");
          this.authService.doLogout(userId);
        },
      });
  }

  crearSala() {
    if (this.nomSalaNova) {
      this.salaService.crearSala(this.usuari.id!, this.nomSalaNova);
      this.nomSalaNova = '';
      this.mostraInput = false;
    }
  }

  escollirSala(salaId: any) {
    this.salaService.entrarASala(this.usuari.id!, salaId);
    //console.log('xat.component-sala escollida:', salaId);
    this.userService.obtenirUsuaris();
    setTimeout(() => {
      this.scrollToEnd();
    }, 100);
  }

  enviarMissatge(): void {
    try {
      //console.log('xat-sendMessage-newMessage', this.newMessage);
      if (this.salaService.salaActiva && this.salaService.salaActiva.id) {
        // No enviem missatges buits
        if (this.newMessage.text) {
          this.missatgeService.enviaMissatge(
            this.usuari.id!,
            this.newMessage.text,
            this.salaService.salaActiva.id
          );
          this.newMessage.text = '';
        }
        setTimeout(() => {
          this.scrollToEnd();
        }, 100);
      } else {
        throw new Error('No hi ha sala escollida');
      }
    } catch (error) {
      console.log(error);
    }
  }

  scrollToEnd(): void {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTo({
        top: this.scrollContainer.nativeElement.scrollHeight,
        left: 0,
        behavior: 'instant',
      });
    }
  }

  ngOnDestroy(): void {
    return;
  }

}
