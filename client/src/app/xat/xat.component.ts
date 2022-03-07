import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { XatService } from './xat.service';

@Component({
  selector: 'app-xat',
  templateUrl: './xat.component.html',
  styleUrls: ['./xat.component.sass'],
})
export class XatComponent implements OnInit {
  id: number = 0;
  newMessage: string = '';
  messageList: string[] = [];

  constructor(private xatService: XatService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    //console.log('id:',this.id);
    

    this.xatService.getNewMessage().subscribe((message: string) => {
      this.messageList.push(message);
    });
  }

  sendMessage() {
    this.xatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }

  
}
