import { Component, OnInit } from '@angular/core';
import { SalaService, Sala } from './sala.service';

@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.scss']
})
export class SalaComponent implements OnInit {

  sales: Sala[] = [];

  constructor(private salaService: SalaService) {
    this.salaService.getSales().subscribe((sales: any) => {
      this.sales = sales.msg;
    });
    
  }
  ngOnInit(): void {
  }

}
