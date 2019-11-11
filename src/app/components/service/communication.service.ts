import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CitihackService } from './citihack.service';



 // const SOCKET_URL = 'ws://127.0.0.1:8080/citihacks/endpoint/2'; // Local Connection
 const SOCKET_URL = 'ws://citihacks123.azurewebsites.net//citihacks-0.0.1-SNAPSHOT/endpoint/1?push=EventUpdates';

 export interface Message {
  author: string;
  message: string;
}

@Injectable()
export class CommunicationService {
  public messages: Subject<any>;

  constructor(private citihackService: CitihackService) {
    this.messages = <Subject<any>>citihackService.connect(SOCKET_URL);
    console.log('This websocket message', this.messages);
    //   map(
    //   (response: MessageEvent): Message => {
    //     const data = JSON.parse(response.data);
    //     return {
    //       author: data.author,
    //       message: data.message
    //     };
    //   }
    // );
  }
}
