import { Component, EventEmitter, Output } from '@angular/core';
import { OverlayService } from 'src/app/services/overlay.service';
import { CreateEventComponent } from '../create-event/create-event.component';

@Component({
	selector: 'app-top-bar',
	templateUrl: './top-bar.component.html',
	styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
	@Output() sidenavToggled = new EventEmitter();

	constructor(private overlayService: OverlayService) {}

	toggleSidenav() {
		this.sidenavToggled.emit();
	}

	toggleCreateEventOverlay() {
		this.overlayService.open(CreateEventComponent);
	}
}
