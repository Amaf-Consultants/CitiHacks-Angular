import { Component, OnInit } from "@angular/core";
import * as uuid from "uuid";
import { CommunicationService } from "./components/service/communication.service";
import { Subject, Observer } from "rxjs";
import { Message } from "@angular/compiler/src/i18n/i18n_ast";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  public subject: Subject<any>;
  public messages: Message[] = [];
  public inbox = 0;
  public subscriber = 0;
  public rejected = 0;
  public duplicate = 0;
  public answered = 0;

  constructor(private communicationService: CommunicationService) {}

  ngOnInit(): void {

  }

  getDashBoard() {
    // if (!this.subject) {
      this.subject = this.communicationService.getDashBoardData(9);
      this.subject.subscribe(resp => {
        // this.inbox = JSON.parse(resp.data).messages.length;
        const Obj = JSON.parse(resp.data);
        if (Obj.hasOwnProperty('messages')) {
          this.messages = Obj.messages;
          this.inbox = Obj.messages.length;
        }

        if (Obj.hasOwnProperty('msgId')) {
          this.inbox += 1;
        }

        if (Obj.hasOwnProperty('userId')) {
            console.log(Obj);
        }
        console.log(JSON.parse(resp.data));
      });
    // }

    setTimeout(() => {
      this.subject.next('testing');
    }, 1000);
  }



}
