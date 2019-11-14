import { Component } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent {
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
}
