import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CommunicationsService } from 'src/app/services/communication.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	events: any[] = [];
	eventSubject: Subject<any>;
	showSpinner: boolean = true;

	constructor(
		private communicationsService: CommunicationsService,
		private sharedService: SharedService
	) { }

	ngOnInit() {
		console.log('pull event data')
		this.eventSubject = this.communicationsService.pullEventData();
		this.eventSubject.subscribe(response => {
			console.log(response);
			console.log('has property', response.data);
			const eventsObject: any[] = JSON.parse(response.data);
			if (!eventsObject.hasOwnProperty("msgId")) {
				// it also listening msg data skip if msg data is here
				eventsObject.forEach(d => {
					console.log("got data", d);
					this.events.push({ eventId: d.eventId, eventName: d.eventName });
				});
				// push the selected event to the shared service
				this.sharedService.pushEvent(this.events[0].eventId);
			}
		});
		setTimeout(() => {
			console.log('publish on event')
			this.eventSubject.next("pullEvent");
		}, 2000);

		// subscribe to messages
		this.sharedService.messageUpdates.subscribe(x => {
			this.showSpinner = false;
		})
	}
	accepted = [
		{
			category: 'Answered Questions',
			value: 66
		},
		{
			category: 'Total Questions',
			value: 111
		}
	];

	rejected = [
		{
			category: 'Rejected Questions',
			value: 33
		},
		{
			category: 'Total Questions',
			value: 111
		}
	];

	duplicated = [
		{
			category: 'Duplicated Questions',
			value: 12
		},
		{
			category: 'Total Questions',
			value: 111
		}
	];

	eventChanged(eventId: number) {
		// push the selected event to the shared service
		this.sharedService.pushEvent(eventId);
	}
}
