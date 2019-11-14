import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-analytics',
  templateUrl: './dashboard-analytics.component.html',
  styleUrls: ['./dashboard-analytics.component.css']
})
export class DashboardAnalyticsComponent implements OnInit, AfterViewInit {

  @ViewChild('eventduration', { static: true }) eventduration: ElementRef;
  @ViewChild('subscribers', { static: false }) subscribers: ElementRef;
  @ViewChild('queued', { static: false }) messageinqueu: ElementRef;
  @ViewChild('received', { static: false }) messagereceived: ElementRef;
  @ViewChild('duplicate', { static: false }) duplicate: ElementRef;
  @ViewChild('answered', { static: false }) answered: ElementRef;
  public canvas: CanvasRenderingContext2D;
 x = null;
 y = null;  radius = null;  lineWidth = null;  strockStyle = null;
 from = null ;
 to = null;

 data =
 {
     numberOfParts: 4,
     parts: {'pt': [20 , 30 , 25 , 25]}, // percentage of each parts
     colors: {'cs': ['red', 'green', 'blue', 'yellow']}// color of each part
 };

 ngAfterViewInit(): void {
  this.canvas = (<HTMLCanvasElement>this.eventduration.nativeElement).getContext('2d');
  setInterval(() => this.test(), 2000);
 }

 test() {
   this.data.parts.pt = [20 , Math.floor(Math.random() * 10) + 1   , Math.floor(Math.random() * 35) + 1   , 35];
  this.set(50, 45, 30, 0, Math.PI * 2, 25, '#fff');
  this.draw(this.data);
}

  constructor() { }

  ngOnInit() {
  }


  set ( x, y, radius, from, to, lineWidth, strockStyle) {

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.from = from;
    this.to = to;
    this.lineWidth = lineWidth;
    this.strockStyle = strockStyle;
}

   draw(data) {
    this.canvas.beginPath();
    this.canvas.lineWidth = this.lineWidth;
    this.canvas.strokeStyle = this.strockStyle;
    this.canvas.arc(this.x , this.y , this.radius , this.from , this.to);
    this.canvas.stroke();
    const numberOfParts = data.numberOfParts;
    const parts = data.parts.pt;
    const colors = data.colors.cs;
    let df = 0;
    for (let i = 0; i < numberOfParts; i++) {
      this.canvas.beginPath();
      this.canvas.strokeStyle = colors[i];
      this.canvas.arc(this.x, this.y, this.radius, df, df + (Math.PI * 2) * (parts[i] / 100));
      this.canvas.stroke();
        df += (Math.PI * 2) * (parts[i] / 100);
    }
}

}

