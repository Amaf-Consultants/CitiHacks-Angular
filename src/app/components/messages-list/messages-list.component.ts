import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css']
})
export class MessagesListComponent implements OnInit {
  messages: any;
  inbox: number;
  read: number = 0;
  answered: number = 0;
  duplicate: number = 0;
  rejected: number = 0;

  constructor(private sharedService: SharedService) { }


  ngOnInit() {
    this.sharedService.messageUpdates.subscribe(x => {
      this.messages = x;
      // set all filters to 0
      this.read = 0;
      this.answered = 0;
      this.duplicate = 0;
      this.rejected = 0;
      this.sortMessages();
    });
  }

  sortMessages() {
    this.inbox = this.messages.length;
    this.messages.forEach((message) => {
      switch (message.msgStatus) {
        case "Read":
          this.read++;
          break;
        case "Answered":
          this.answered++;
          break;
        case "Duplicate":
          this.duplicate++;
          break;
        case "Reject":
          this.rejected++;
          break;
        default:
          console.log('do nothing', message.msgStatus);
          break;
      }
    })
  }

  showMessages(filter: string) {
    this.sharedService.updateGridFilters(filter);
  }
}
