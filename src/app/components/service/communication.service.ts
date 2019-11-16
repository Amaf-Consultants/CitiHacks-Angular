import { Injectable } from '@angular/core';
import { Subject, from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CitihackService } from './citihack.service';
import { MessageData } from './data/message-data';
import { Message } from '../model/message';



 // const SOCKET_URL = 'ws://127.0.0.1:8080/citihacks/endpoint/2'; // Local Connection
 // const SOCKET_URL = 'ws://citihacks123.azurewebsites.net//citihacks-0.0.1-SNAPSHOT/endpoint/1?push=EventUpdates';


@Injectable()
export class CommunicationService {
  public messages: Subject<any>;
  private url_suffix: String = 'ws://citihacks123.azurewebsites.net//citihacks-0.0.1-SNAPSHOT/';
  private local_url_suffix: String = 'ws://127.0.0.1:8080/citihacks/';
  private socket_url: String = '';

  constructor(private citihackService: CitihackService) { }


  public getEventData(): Subject<any> {
     this.socket_url  = this.local_url_suffix + 'endpoint/1'; // Local Connection
   //  this.socket_url = this.url_suffix + 'endpoint/1';
    return  this.citihackService.connect(this.socket_url);
  }

  public subscribeEventData(): Subject<any> {
    this.socket_url  = this.local_url_suffix + 'endpoint/1?push=EventUpdates'; // Local Connection
    // this.socket_url = this.url_suffix + 'endpoint/1?push=EventUpdates';
   return <Subject<any>> this.citihackService.connect(this.socket_url );
  }

  public getUserData(): Subject<any> {
    this.socket_url  = this.local_url_suffix + 'endpoint/2'; // Local Connection
  //  this.socket_url = this.url_suffix + 'endpoint/2';

    return  <Subject<any>> this.citihackService.connect(this.socket_url );

  }

  public subscribeUserData(): Subject<any> {
    this.socket_url  = this.local_url_suffix +  'endpoint/2?push=UserUpdates'; // Local Connection
   // this.socket_url = this.url_suffix + 'endpoint/2?push=UserUpdates';

    return <Subject<any>> this.citihackService.connect(this.socket_url );

  }

  public getMessageData(): Subject<any> {
    this.socket_url  = this.local_url_suffix +  'endpoint/3'; // Local Connection
  //  this.socket_url = this.url_suffix + 'endpoint/3';

    return <Subject<any>> this.citihackService.connect(this.socket_url );
  }

  public subscribeMessageData(): Subject<any> {
    this.socket_url  = this.local_url_suffix +  'endpoint/3?push=MessageUpdates';  // Local Connection
   // this.socket_url = this.url_suffix + 'endpoint/3?push=MessageUpdates';

   return <Subject<any>> this.citihackService.connect(this.socket_url );

  }

  public getDashBoardData(eventId: number): Subject<any> {
    this.socket_url  = this.local_url_suffix +  'endpoint/4?eventId=' + eventId; // Local Connection
   // this.socket_url = this.url_suffix + 'endpoint/4';

    return  this.citihackService.connect(this.socket_url );

  }

  public subscribeDashBoardData(): Subject<any> {
    this.socket_url  = this.local_url_suffix +  'endpoint/4?push=DashBoardUpdates&eventId=2'; // Local Connection
   // this.socket_url = this.url_suffix + 'endpoint/1?push=DashBoardUpdates';

   return <Subject<any>> this.citihackService.connect(this.socket_url );

  }

   public unSubscribeDashBoardData(): Subject<any> {
    this.socket_url  = this.local_url_suffix +  'endpoint/4?push=NoUpdates&eventId=2'; // Local Connection
   // this.socket_url = this.url_suffix + 'endpoint/1?push=DashBoardUpdates';

   return <Subject<any>> this.citihackService.connect(this.socket_url );
  }

}
