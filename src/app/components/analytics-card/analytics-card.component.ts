import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-analytics-card',
	templateUrl: './analytics-card.component.html',
	styleUrls: ['./analytics-card.component.css']
})
export class AnalyticsCardComponent {
	@Input() numberTotal: string;
	@Input() contextType: string;
}
