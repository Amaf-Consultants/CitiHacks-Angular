import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Component } from '@angular/core';

@Component({
  selector: 'app-message-status',
  templateUrl: './message-status.component.html',
  styleUrls: ['./message-status.component.scss']
})
export class MessageStatusComponent implements ICellRendererAngularComp {
  foods: any[];
  constructor() { }

  agInit(params) {
    this.foods = [
      { value: 'steak-0', viewValue: 'Steak' },
      { value: 'pizza-1', viewValue: 'Pizza' },
      { value: 'tacos-2', viewValue: 'Tacos' }
    ];
  }

  refresh() {
    return false;
  }

}
