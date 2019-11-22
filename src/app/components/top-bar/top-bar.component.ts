import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OverlayService } from 'src/app/services/overlay.service';
import { CreateEventComponent } from '../create-event/create-event.component';
interface Event {
	eventId: string,
	eventName: string
}
@Component({
	selector: 'app-top-bar',
	templateUrl: './top-bar.component.html',
	styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
	@Output() sidenavToggled = new EventEmitter();


	constructor(
		private overlayService: OverlayService) { }

	ngOnInit() {

	}

	toggleSidenav() {
		this.sidenavToggled.emit();
	}

	toggleCreateEventOverlay() {
		this.overlayService.open(CreateEventComponent);
	}
}
