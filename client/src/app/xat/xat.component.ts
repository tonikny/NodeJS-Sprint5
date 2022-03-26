import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';

import { MissatgeService } from '../missatge/missatge.service';
import { SalaService } from '../sala/sala.service';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user';
import { Missatge } from '../shared/missatge';
import { Sala } from '../shared/sala';

@Component({
  selector: 'app-xat',
  templateUrl: './xat.component.html',
  styleUrls: ['./xat.component.scss'],
})
export class XatComponent implements OnInit {
  user: User = new User();
  llistaSales!: Observable<Sala[]>;
  salaActivaObs: Observable<Sala> | undefined;
  salaActiva: Sala | undefined;
  newMessage: Missatge = {} as Missatge;
  llistaMissatges!: Observable<Missatge[]>;

  constructor(
    private salaService: SalaService,
    private missatgeService: MissatgeService,
    private authService: AuthService
  ) {
    this.obtenirUser();
    //this.obtenirSales();
    //this.obtenirMissatges();

  }

  //element.scrollIntoView({ behavior: "smooth", block: "start" });

  ngOnInit(): void {
    this.llistaSales = this.salaService.sales; // subscribe to entire collection
    this.salaService.obtenirSales(); // load all sales
    this.salaActivaObs = this.salaService.salaActivaObs; // subscribe to entire collection

    //await this.obtenirSales2();
    this.llistaMissatges = this.missatgeService.missatges; // subscribe to entire collection
    this.missatgeService.obtenirMissatges(); // load all missatges
  }

  ////////////////////////////////////////////////////////////////////////////////////
  eventEntraASala() {}
  eventSurtSala() {}
  eventSalaCreada() {}
  eventLlistaSales() {}
  eventMissatgeRebut() {}
  eventLlistaMissatges() {}

  ////////////////////////////////////////////////////////////////////////////////////
  crearSala() {}
  entrarASala() {}
  _llistaSales() {}
  _enviarMissatge() {}
  _llistaMissatges() {}
  ////////////////////////////////////////////////////////////////////////////////////

  obtenirUser() {
    const token = this.authService.getUserTokenData();
    console.log('obtenirUser-token', token);
    const userId = token.userId;
    //const userId = sessionStorage.getItem('userId')
    this.authService.getUser(userId).subscribe((user: any) => {
      console.log('user:', user);

      this.user = user;
    });
  }

  obtenirSales() {
    this.salaService.obtenirSales();
    console.log('xat.component-onInit-sales:', this.llistaSales);
  }
  /*   async obtenirSales2() {
    this.llistaSales = await this.salaService.obtenirSales2();
    console.log('xat.component-obtenir-sales:', this.llistaSales);
  } */

  /* async escollirSala(salaId: any) {
    this.salaEscollida = await this.salaService.entrarASala(salaId);
    console.log('xat.component-sala escollida:', this.salaEscollida);
  } */
  async escollirSala(salaId: any) {
    this.salaService.entrarASala(salaId);
    console.log('xat.component-sala escollida:', salaId);
    /* this.salaActivaObs!.pipe(take(1)).subscribe((value) => {
      //this.salaActiva = value;
      console.log('value', value);
      
    }); */
  }

  /*   async enviarMissatge(): Promise<void> {
    try {
      console.log('xat-sendMessage-newMessage', this.newMessage);
      if (!this.salaEscollida) {
        throw new Error('No hi ha sala escollida');
      }
      if (this.newMessage.text) {
        const m: Missatge = await this.missatgeService.enviaMissatge(
          this.newMessage.text,
          this.salaEscollida.id
        );
        this.llistaMissatges.push(m);
        this.newMessage.text = '';
      }
    } catch (error) {
      console.log(error);
    }
  } */
  enviarMissatge(): void {
    try {
      console.log('xat-sendMessage-newMessage', this.newMessage);
      if (this.salaService.salaActiva && this.salaService.salaActiva.id) {
        if (this.newMessage.text) {
          // No enviem missatges buits
          //this.salaActiva.subscribe((data) => console.log('div',data));
          // this.salaActivaObs!.pipe(take(1)).subscribe(value => {
          //   this.salaActiva = value;
          // });
          this.missatgeService.enviaMissatge(
            this.newMessage.text,
            this.salaService.salaActiva.id
          );
          this.newMessage.text = '';
        }
      } else {
        throw new Error('No hi ha sala escollida');
      }
    } catch (error) {
      console.log(error);
    }
  }

  /*   async obtenirMissatges() {
    this.missatgeService.obtenirMissatges().subscribe({
      next: (llista: Missatge[]) => {
        console.log('xat.component-obtenirMissatges-getNewMessage', llista);
        this.llistaMissatges = llista;
      },
      error: (err) => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),
    });
    console.log('xat.component-missatge-publicat:', this.llistaMissatges);
  } */
}
