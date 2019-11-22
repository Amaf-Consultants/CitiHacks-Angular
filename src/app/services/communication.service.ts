import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { CitiHacksService } from './citihacks.service';

@Injectable({
    providedIn: 'root'
})
export class CommunicationsService {
    public messages: Subject<any>;
    private local_url_suffix: String = 'ws://citihacks123.azurewebsites.net/citihacks/';
    private socket_url: String = '';

    constructor(private citihackService: CitiHacksService) { }


    public getEventData(): Subject<any> {
        this.socket_url = this.local_url_suffix + 'endpoint/1';
        return this.citihackService.connect(this.socket_url);
    }

    public pullEventData(): Subject<any> {
        this.socket_url = this.local_url_suffix + 'endpoint/1?pull=Events';
        return this.citihackService.connect(this.socket_url);
    }

    public subscribeEventData(): Subject<any> {
        this.socket_url = this.local_url_suffix + 'endpoint/1?push=EventUpdates';
        return <Subject<any>>this.citihackService.connect(this.socket_url);
    }

    public getUserData(): Subject<any> {
        this.socket_url = this.local_url_suffix + 'endpoint/2';
        return <Subject<any>>this.citihackService.connect(this.socket_url);

    }

    public subscribeUserData(): Subject<any> {
        this.socket_url = this.local_url_suffix + 'endpoint/2?push=UserUpdates';
        return <Subject<any>>this.citihackService.connect(this.socket_url);

    }

    public getMessageData(): Subject<any> {
        this.socket_url = this.local_url_suffix + 'endpoint/3';
        return <Subject<any>>this.citihackService.connect(this.socket_url);
    }

    public updateMessageData(): Subject<any> {
        this.socket_url = this.local_url_suffix + 'endpoint/3?update=msgUpdate';

        return <Subject<any>>this.citihackService.connect(this.socket_url);
    }

    public subscribeMessageData(): Subject<any> {
        this.socket_url = this.local_url_suffix + 'endpoint/3?push=MessageUpdates';

        return <Subject<any>>this.citihackService.connect(this.socket_url);

    }

    public getDashBoardData(eventId: number): Subject<any> {
        this.socket_url = this.local_url_suffix + 'endpoint/4?eventId=' + eventId;
        return this.citihackService.connect(this.socket_url);

    }

    public subscribeDashBoardData(): Subject<any> {
        this.socket_url = this.local_url_suffix + 'endpoint/4?push=DashBoardUpdates&eventId=2';
        return <Subject<any>>this.citihackService.connect(this.socket_url);

    }

    public unSubscribeDashBoardData(): Subject<any> {
        this.socket_url = this.local_url_suffix + 'endpoint/4?push=NoUpdates&eventId=2';
        return <Subject<any>>this.citihackService.connect(this.socket_url);
    }

}