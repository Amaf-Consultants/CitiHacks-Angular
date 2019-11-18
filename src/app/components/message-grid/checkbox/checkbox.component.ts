
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { ICellRendererParams } from '@ag-grid-community/core';
import { Component } from '@angular/core';
import { Message } from '../model/message';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements ICellRendererAngularComp {
  private params: ICellRendererParams;
  data: Message;
  value: boolean;

  constructor() { }

  agInit(params: ICellRendererParams) {
    this.params = params;
    this.data = this.params.node.data;
    this.value = (this.params as any).messageStatus === this.data.MsgStatus
  }

  refresh(): boolean {
    return false;
  }

}
