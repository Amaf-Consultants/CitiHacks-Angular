import { Component, OnInit } from "@angular/core";
import * as uuid from "uuid";
import { CommunicationService } from "./components/service/communication.service";
import { Subject, Observer } from "rxjs";
import { Message } from "./components/model/message";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  public subject: Subject<any>;
  public eventSubject: Subject<any>;
  public updateSubject: Subject<any>;
  public messages: Message[] = [];
  public msgStatuses: string[] = ["Read", "Duplicate", "Reject", "Answered"];
  public selectedStatus: string = null;
  public inbox = 0;
  public subscriber = 0;
  public rejected = 0;
  public duplicate = 0;
  public answered = 0;
  public msgList: Message[] = [];
  public showlistType: string;
  public selectedEvent: string = null;
  public events: any[] = [];

  constructor(private communicationService: CommunicationService) {}

  ngOnInit() {
    this.eventSubject = this.communicationService.pullEventData();
    this.eventSubject.subscribe(data => {
      const eventsObject: any[] = JSON.parse(data.data);
      if (!eventsObject.hasOwnProperty("msgId")) {
        // it also listening msg data skip is msg data is here
        eventsObject.forEach(d => {
          console.log("Data", d);
          this.events.push({ eventId: d.eventId, eventName: d.eventName });
        });
      }
    });
    setTimeout(() => {
      this.eventSubject.next("pullEvent");
    }, 2000);
  }

  updateMessageCenter(showList: string) {
    this.subscriber = Array.from(
      new Set(this.messages.map((item: any) => item.userId))
    ).length;
    this.rejected = this.messages.filter(
      msg => msg.msgStatus === "Reject"
    ).length;
    this.answered = this.messages.filter(
      msg => msg.msgStatus === "Answered"
    ).length;
    this.duplicate = this.messages.filter(
      msg => msg.msgStatus === "Duplicate"
    ).length;
    this.inbox = this.messages.filter(msg => msg.msgStatus === "Read").length;

    switch (showList) {
      case "Inbox":
        this.msgList = this.messages.filter(msg => msg.msgStatus === "Read");
        break;
      case "Duplicate":
        this.msgList = this.messages.filter(
          msg => msg.msgStatus === "Duplicate"
        );
        break;
      case "Reject":
        this.msgList = this.messages.filter(msg => msg.msgStatus === "Reject");
        break;
      case "Answered":
        this.msgList = this.messages.filter(
          msg => msg.msgStatus === "Answered"
        );
        break;
    }
  }

  onClickMessageType(showList: string) {
    this.showlistType = showList;
    this.updateMessageCenter(showList);
  }

  getDashBoard() {
    // if (!this.subject) {
    this.subject = this.communicationService.getDashBoardData(
      parseInt(this.selectedEvent)
    );
    this.subject.subscribe(resp => {
      const Obj = JSON.parse(resp.data);
      if (Obj.hasOwnProperty("messages")) {
        this.messages = Obj.messages;
        // this.subscriber = Array.from(new Set(this.messages.map((item: any) => item.userId))).length;
        // this.answered = Array.from(new Set(this.messages.map((item: any) => item.msgStatus = 'Answered'))).length;
        // this.inbox = Obj.messages.length;
      }

      if (Obj.hasOwnProperty("msgId")) {
        if (
          Obj.eventId === parseInt(this.selectedEvent) &&
          !this.messages.indexOf(Obj.msgId)
        ) {
          this.inbox += 1;
          this.messages.push(Obj);
        }
      }

      if (Obj.hasOwnProperty("userId")) {
        console.log(Obj);
      }

      // Don't have any mechanism to know for which event
      // We are assuimg it is for current event as we are showing only active event
      if (Obj.hasOwnProperty("id")) {
        this.subscriber += 1;
      }
      this.showlistType = "Inbox";
      this.updateMessageCenter(this.showlistType);
      console.log(JSON.parse(resp.data));
    });
    // }

    setTimeout(() => {
      this.subject.next("testing");
    }, 1000);
  }

  updateMessage(selectData) {
    // tslint:disable-next-line: member-ordering
    let updateMessage = {
      msgId: selectData.target.id, //'2b8dc745-e836-4d84-9abc-8232e4ba711d',
      eventId: this.selectedEvent,
      userId: "NewUser123",
      message: "This Message Status is Changed to answered",
      msgAppType: "Mobile",
      msgAttachement: "",
      msgCreateDate: new Date().toDateString(),
      msgQuality: 2,
      msgStatus: selectData.target.value,
      msgUpdateDate: new Date().toDateString()
    };

    let objVal = this.messages.find(m => m.msgId === selectData.target.id);
    if (objVal) {
      objVal.msgStatus = selectData.target.value;
    }
    // if (!this.subject) {
    this.updateSubject = this.communicationService.updateMessageData();
    this.updateSubject.subscribe(resp => {
      const Obj = JSON.parse(resp.data);

      if (Obj.hasOwnProperty("messages")) {
        this.messages = Obj.messages;
        // this.subscriber = Array.from(new Set(this.messages.map((item: any) => item.userId))).length;
        // this.answered = Array.from(new Set(this.messages.map((item: any) => item.msgStatus = 'Answered'))).length;
        // this.inbox = Obj.messages.length;
      }

      if (Obj.hasOwnProperty("msgId") && !this.messages.indexOf(Obj.msgId)) {
        this.inbox += 1;
        this.messages.push(Obj);
      }

      if (Obj.hasOwnProperty("userId")) {
        console.log(Obj);
      }

      this.updateMessageCenter(this.showlistType);
      console.log(JSON.parse(resp.data));
    });
    // }

    setTimeout(() => {
      this.updateSubject.next(updateMessage);
    }, 1000);
  }
}
