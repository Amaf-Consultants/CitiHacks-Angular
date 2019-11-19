import { AllCommunityModules, ColumnApi, GridApi } from '@ag-grid-community/all-modules';
import { Component } from '@angular/core';
import { DeviceService, DeviceType } from 'src/app/services/device.service.js';
import data from '../../../api/message-data.json';
import { MessageDetailsService } from '../service/message-details.service';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { MessageStatusComponent } from './message-status/message-status.component.js';
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
  columnApi: ColumnApi;
  deviceType: DeviceType = DeviceType.Desktop;

  constructor(private messageDetailsService: MessageDetailsService, private deviceService: DeviceService) { }

  ngOnInit() {
    this.columnDefs = [
      { headerName: 'User', field: 'UserId', colId: '1desktop' },
      { headerName: 'Event', field: 'EventId', colId: '2desktop' },
      { headerName: 'Source', field: 'MsgAppType', colId: '3desktop' },
      { headerName: 'Message', field: 'Message' },
      { headerName: 'Date', field: 'MsgCreateDate', colId: '4desktop' },
      {
        headerName: "Read",
        field: "Read",
        colId: '5desktop',
        minWidth: 70,
        maxWidth: 100,
        cellRendererFramework: CheckboxComponent,
        cellRendererParams: { messageStatus: MessageStatus.Read }
      },
      {
        headerName: "Accepted",
        field: "Accepted",
        colId: '6desktop',
        minWidth: 70,
        maxWidth: 100,
        cellRendererFramework: CheckboxComponent,
        cellRendererParams: { messageStatus: MessageStatus.Accepted }
      },
      {
        headerName: "Rejected",
        field: "Rejected",
        colId: '7desktop',
        minWidth: 70,
        maxWidth: 100,
        cellRendererFramework: CheckboxComponent,
        cellRendererParams: { messageStatus: MessageStatus.Rejected }
      },
      {
        headerName: "Status",
        field: "status",
        colId: "mobile",
        cellRendererFramework: MessageStatusComponent
      }
    ];

    this.rowData = data as Message[];

    this.deviceType = this.deviceService.getDevice();

  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.setColumnsVisibility();
    this.gridApi.sizeColumnsToFit();
    //start listening to the device changed updates
    this.deviceService.deviceChanged.subscribe(x => {
      this.deviceType = x;
      this.setColumnsVisibility();
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

  private setColumnsVisibility() {
    this.columnApi.getAllColumns().forEach(col => {
      if (col.getColId().endsWith('desktop')) this.columnApi.setColumnVisible(col, this.deviceType === DeviceType.Desktop);
      if (col.getColId().endsWith('mobile')) this.columnApi.setColumnVisible(col, this.deviceType === DeviceType.Desktop);
    })
  }



}

