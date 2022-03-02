import { Component, OnInit } from '@angular/core';
import { XatService } from './xat.service';

@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.sass'],
})
export class SalaComponent implements OnInit {
  newMessage: string = '';
  messageList: string[] = [];

  constructor(private xatService: XatService) {
    (async () => await xatService.provaGetRestApi())();
  }

  ngOnInit() {
    this.xatService.getNewMessage().subscribe((message: string) => {
      this.messageList.push(message);
    });
  }

  sendMessage() {
    this.xatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }

  
}
