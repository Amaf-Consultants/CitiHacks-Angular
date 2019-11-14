import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { AfterViewInit, Component, Input, NgZone, OnDestroy } from '@angular/core';

am4core.useTheme(am4themes_animated);

@Component({
	selector: 'app-pie-chart',
	templateUrl: './pie-chart.component.html',
	styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements AfterViewInit, OnDestroy {
	@Input() data: any;
	@Input() categoryField: string;
	@Input() valueField: string;
	@Input() id: string;
	@Input() graphTitle: string;

	private chart: am4charts.PieChart;

	constructor(private zone: NgZone) {}

	ngAfterViewInit() {
		this.zone.runOutsideAngular(() => {
			const chart = am4core.create('pie-chart-div', am4charts.PieChart);

			chart.data = this.data;

			let pieSeries = chart.series.push(new am4charts.PieSeries());
			pieSeries.dataFields.value = this.valueField;
			pieSeries.dataFields.category = this.categoryField;

			chart.innerRadius = am4core.percent(40);

			pieSeries.slices.template.stroke = am4core.color('#4a2abb');
			pieSeries.slices.template.strokeWidth = 2;
			pieSeries.slices.template.strokeOpacity = 1;

			pieSeries.labels.template.text = '';

			const title = chart.titles.create();
			title.text = this.graphTitle;
			title.fontSize = 25;
			title.marginBottom = 0;
		});
	}

	ngOnDestroy() {
		this.zone.runOutsideAngular(() => {
			if (this.chart) {
				this.chart.dispose();
			}
		});
	}
}
