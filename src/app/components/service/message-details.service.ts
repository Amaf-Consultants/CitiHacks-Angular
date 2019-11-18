import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { Message } from '../message-grid/model/message';

@Injectable()
export class MessageDetailsService{
    message: Subject<Message> = new Subject();

    showMessageDetails(message: Message){
        this.message.next(message);
    }
}