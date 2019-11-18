import { AllCommunityModules, GridApi } from '@ag-grid-community/all-modules';
import { Component } from '@angular/core';
import data from '../../../api/message-data.json';
import { MessageDetailsService } from '../service/message-details.service';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { Message, MessageStatus } from './model/message';


@Component({
  selector: 'app-message-grid',
  templateUrl: './message-grid.component.html',
  styleUrls: ['./message-grid.component.css']
})
export class MessageGridComponent {
  columnDefs;
  rowData: Message[];
  modules = AllCommunityModules;
  gridApi: GridApi;

  constructor(private messageDetailsService: MessageDetailsService) { }

  ngOnInit() {
    this.columnDefs = [
      { headerName: 'User', field: 'UserId' },
      { headerName: 'Event', field: 'EventId' },
      { headerName: 'Source', field: 'MsgAppType' },
      { headerName: 'Message', field: 'Message' },
      { headerName: 'Date', field: 'MsgCreateDate' },
      {
        headerName: "Read",
        field: "Read",
        minWidth: 70,
        maxWidth: 100,
        cellRendererFramework: CheckboxComponent,
        cellRendererParams: { messageStatus: MessageStatus.Read }
      },
      {
        headerName: "Accepted",
        field: "accepted",
        minWidth: 70,
        maxWidth: 100,
        cellRendererFramework: CheckboxComponent,
        cellRendererParams: { messageStatus: MessageStatus.Accepted }
      },
      {
        headerName: "Rejected",
        field: "rejected",
        minWidth: 70,
        maxWidth: 100,
        cellRendererFramework: CheckboxComponent,
        cellRendererParams: { messageStatus: MessageStatus.Rejected }
      }
    ];

    this.rowData = data as Message[];

  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
    window.addEventListener('resize', () => {
      this.gridApi.sizeColumnsToFit();
    })
    // set the message details to show the first message
    if (this.rowData.length > 0) {
      this.messageDetailsService.showMessageDetails(this.rowData[0]);
    }
  }

  onRowClicked(params) {
    console.log('row clicked', params)
    this.messageDetailsService.showMessageDetails(params.node.data)
  }



}

