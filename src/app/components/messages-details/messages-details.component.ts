import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageDetailsService } from '../service/message-details.service';
import { Message } from '../message-grid/model/message';

@Component({
  selector: 'app-messages-details',
  templateUrl: './messages-details.component.html',
  styleUrls: ['./messages-details.component.css']
})
export class MessagesDetailsComponent implements OnInit, OnDestroy {
  message:Message;
  messageSubscription: Subscription;
  constructor(private messageDetailsService: MessageDetailsService) { }

  ngOnInit() {
    this.messageSubscription = this.messageDetailsService.message.subscribe(message=> this.message = message)
  }

  ngOnDestroy(){
    if(this.messageSubscription){
      this.messageSubscription.unsubscribe();
    }
  }

}
