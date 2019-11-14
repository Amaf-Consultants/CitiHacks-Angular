import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-top-bar',
	templateUrl: './top-bar.component.html',
	styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
	@Output() sidenavToggled = new EventEmitter();

	toggleSidenav() {
		this.sidenavToggled.emit();
	}
}
