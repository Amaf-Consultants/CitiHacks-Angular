import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Component } from '@angular/core';

@Component({
  selector: 'app-messages-details',
  templateUrl: './messages-details.component.html',
  styleUrls: ['./messages-details.component.css']
})
export class MessagesDetailsComponent implements ICellRendererAngularComp {
  params;
  data;
  constructor() { }

  agInit(params) {
    this.params = params;
    this.data = params.node.data;
  }

  refresh() {
    return false;
  }

  openParent() {
    this.params.context.componentParent.openDetails(this.data);
  }

}
