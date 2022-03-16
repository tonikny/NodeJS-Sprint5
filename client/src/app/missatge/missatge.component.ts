import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MissatgeService } from './missatge.service';

@Component({
  selector: 'app-missatge',
  templateUrl: './missatge.component.html',
  styleUrls: ['./missatge.component.scss'],
})
export class MissatgeComponent implements OnInit {
  salaId: number = 0;
  newMessage: string = '';
  messageList: string[] = [];

  constructor(private missatgeService: MissatgeService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.salaId = params['id']; // salaId
    });    

    this.missatgeService.getNewMessage().subscribe((message: string) => {
      this.messageList.push(message);
    });
  }

  sendMessage() {
    this.missatgeService.sendMessage(this.newMessage, this.salaId);
    this.newMessage = '';
  }
  
}
