import { Component, EventEmitter, Output } from '@angular/core';
import { OverlayService } from 'src/app/services/overlay.service';
import { CreateEventComponent } from '../create-event/create-event.component';

@Component({
	selector: 'app-sidenav-list',
	templateUrl: './sidenav-list.component.html',
	styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent {
	@Output() sidenavClosed = new EventEmitter();

	sidenavListItems = [
		{
			name: 'Create Event',
			icon: 'event_available',
			click: () => this.toggleCreateEventOverlay()
		},
		{
			name: 'Sign Out',
			icon: 'power_off',
			click: () => this.logOff()
		}
	];

	constructor(private overlayService: OverlayService) {}

	closeSidenav() {
		this.sidenavClosed.emit();
	}

	logOff() {}

	toggleCreateEventOverlay() {
		this.overlayService.open(CreateEventComponent);
	}
}
