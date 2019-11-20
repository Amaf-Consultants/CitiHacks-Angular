import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { Message } from '../components/message-grid/model/message';
import { CommunicationsService } from './communication.service';

@Injectable({
    providedIn: 'root'
})
export class SharedService {
    selectedEvent: Subject<any> = new Subject();
    messageUpdates = new ReplaySubject<any>();
    gridFiltersUpdates = new Subject<any>();
    private dashboardSubject: Subject<any>;
    static eventSelected: number;
    private messageCache: Message[];

    constructor(private communicationsService: CommunicationsService) { }

    pushEvent(eventId: number) {
        SharedService.eventSelected = eventId;
        console.log('event selected', eventId);
        // get messages for the selected event
        this.dashboardSubject = this.communicationsService.getDashBoardData(eventId);
        this.dashboardSubject.subscribe(response => {
            const resp = JSON.parse(response.data);
            if (resp.hasOwnProperty("messages")) {
                let messages = [];
                resp.messages.forEach(x => {
                    if (Number(x.eventId) === Number(SharedService.eventSelected)) {
                        messages.push(x);
                    }
                })
                if (messages.length > 0) {
                    console.log('got dasboard data', messages);
                    //update the cache
                    this.messageCache = messages;
                    // push messages to all the listeners
                    this.messageUpdates.next(this.messageCache);
                }
            }
            if (resp.hasOwnProperty("msgId")) {
                // single message update
                if (Number(resp.eventId) === Number(SharedService.eventSelected) && !this.messageCache.indexOf(resp.msgId)) {
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