import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Component } from '@angular/core';
import { Message, MessageStatus } from '../model/message';

@Component({
  selector: 'app-message-status',
  templateUrl: './message-status.component.html',
  styleUrls: ['./message-status.component.scss']
})
export class MessageStatusComponent implements ICellRendererAngularComp {
  params;
  status: MessageStatus;
  messageStatus = MessageStatus;
  data: Message;
  constructor() { }

  agInit(params) {
    this.params = params;
    this.data = params.node.data;
    this.status = params.node.data.msgStatus;
    //console.log(params)
  }

  refresh() {
    return false;
  }

  statusChanged(value) {
    console.log('option changed', value);
    this.data.msgStatus = value;
    this.params.context.componentParent.updateMessage(this.data, this.params.node.rowIndex);
  }

}
