import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-sidenav-list',
	templateUrl: './sidenav-list.component.html',
	styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent {
	@Output() sidenavClosed = new EventEmitter();

	sidenavListItems = [
		{
			name: 'Sign Out',
			icon: 'power_off',
			click: () => this.logOff()
		}
	];

	closeSidenav() {
		this.sidenavClosed.emit();
	}

	logOff() {}
}
