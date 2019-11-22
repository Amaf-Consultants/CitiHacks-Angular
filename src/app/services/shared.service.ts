import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Message } from '../components/message-grid/model/message';
import { CommunicationsService } from './communication.service';

@Injectable({
    providedIn: 'root'
})
export class SharedService {
    selectedEvent: Subject<any> = new Subject();
    messageUpdates = new BehaviorSubject<any>([]);
    gridFiltersUpdates = new Subject<any>();
    subscribersUpdated = new Subject();
    private dashboardSubject: Subject<any>;
    static eventSelected: number;
    private messageCache: Message[] = [];

    constructor(private communicationsService: CommunicationsService) { }

    pushEvent(eventId: number) {
        // event has been changed
        // delete the current message cache and send [] to reflect the ui
        this.pushMessages([]);
        SharedService.eventSelected = eventId;
        console.log('event selected', eventId);
        // get messages for the selected event
        this.dashboardSubject = this.communicationsService.getDashBoardData(eventId);
        this.dashboardSubject.subscribe(response => {
            const resp = JSON.parse(response.data);
            if (resp.hasOwnProperty("messages")) {
                const messages = resp.messages.filter(x => Number(x.eventId) === Number(SharedService.eventSelected));
                if (messages.length > 0) {
                    console.log('got dasboard data', messages);
                    this.pushMessages(messages);
                }
            }
            if (resp.hasOwnProperty("msgId")) {
                // single message update
                if (Number(resp.eventId) === Number(SharedService.eventSelected) && this.messageCache.indexOf(resp.msgId) === -1) {
                    this.messageCache.push(resp);
                    this.messageUpdates.next(this.messageCache);
                }
            }


        })

        setTimeout(() => this.dashboardSubject.next("test"), 1000);
    }

    pushMessages(messages: Message[]) {
        this.messageCache = messages;
        // push messages to all the listeners
        this.messageUpdates.next(this.messageCache);
    }

    updateGridFilters(filter: string) {
        this.gridFiltersUpdates.next(filter);
    }

}