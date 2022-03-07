import { Component, OnInit } from '@angular/core';
import { SalaService, Sala } from './sala.service';

@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.sass'],
})
export class SalaComponent implements OnInit {
  sales: Sala[] = []; //FIXME: canviar a tipus concret
  //FIXME: canviar a tipus concret

  constructor(private salaService: SalaService) {
    //FIXME: treure la prova
    //this.salaService.provaGetRestApi();
    this.salaService.getSales().subscribe((sales: Sala[]) => {
      this.sales = sales;
      //console.log('sales:', sales);
    });
    //console.log(this.sales);
    
  }

  ngOnInit() {}


}
