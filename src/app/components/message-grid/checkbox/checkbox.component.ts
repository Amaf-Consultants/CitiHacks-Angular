
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { ICellRendererParams } from '@ag-grid-community/core';
import { Component } from '@angular/core';
import { Message, MessageStatus } from '../model/message';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements ICellRendererAngularComp {
  private params: ICellRendererParams;
  data: Message;
  value: boolean;
  messageStatus = MessageStatus;

  constructor() { }

  agInit(params: ICellRendererParams) {
    this.params = params;
    this.data = this.params.node.data;
    this.value = (this.params as any).messageStatus === this.data.msgStatus;
  }

  refresh(): boolean {
    return false;
  }

  statusChanged() {
    let status;
    if (!this.value) status = MessageStatus.Reject;
    else status = MessageStatus[(this.params as any).messageStatus]
    this.data.msgStatus = status;
    this.params.context.componentParent.updateMessage(this.data);
  }

}
