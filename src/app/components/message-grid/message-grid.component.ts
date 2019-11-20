import { AllCommunityModules, ColumnApi, GridApi } from '@ag-grid-community/all-modules';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, Subscription } from 'rxjs';
import { CommunicationsService } from 'src/app/services/communication.service';
import { DeviceService, DeviceType } from 'src/app/services/device.service';
import { OverlayService } from 'src/app/services/overlay.service';
import { SharedService } from 'src/app/services/shared.service';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { MessagesDetailsComponent } from '../messages-details/messages-details.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { MessageStatusComponent } from './message-status/message-status.component';
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
  context;
  updateSubscription: Subscription;
  updateSubject: Subject<Message> = new Subject();
  rowCssRules;
  static msgStatusFilter: string = 'ALL';

  constructor(
    private deviceService: DeviceService,
    private overlayService: OverlayService,
    private communicationsService: CommunicationsService,
    private sharedService: SharedService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.columnDefs = [
      { headerName: 'User', field: 'userId', colId: '1desktop' },
      { headerName: 'Event', field: 'eventId', colId: '2desktop' },
      { headerName: 'Source', field: 'msgAppType', colId: '3desktop' },
      { headerName: 'Message', field: 'message' },
      { headerName: 'UpdatedOn', field: 'msgUpdateDate', colId: '4desktop', sortable: true },
      {
        headerName: "Read",
        field: "read",
        colId: '5desktop',
        cellRendererFramework: CheckboxComponent,
        cellRendererParams: { messageStatus: MessageStatus.Read }
      },
      {
        headerName: "Answered",
        field: "answered",
        colId: '6desktop',
        cellRendererFramework: CheckboxComponent,
        cellRendererParams: { messageStatus: MessageStatus.Answered }
      },
      {
        headerName: "Duplicate",
        field: "duplicate",
        colId: '7desktop',
        cellRendererFramework: CheckboxComponent,
        cellRendererParams: { messageStatus: MessageStatus.Duplicate }
      },
      {
        headerName: "Rejected",
        field: "reject",
        colId: '8desktop',
        cellRendererFramework: CheckboxComponent,
        cellRendererParams: { messageStatus: MessageStatus.Reject }
      },
      {
        headerName: "Status",
        field: "status",
        colId: "mobile",
        cellRendererFramework: MessageStatusComponent,
        editable: true
      },
      {
        headerName: "",
        field: "details",
        cellRendererFramework: MessagesDetailsComponent,
        minWidth: 50
      }
    ];

    this.sharedService.messageUpdates.subscribe((x: Message[]) => {
      let sortedData = x.sort((a, b) => new Date(b.msgUpdateDate).getTime() - new Date(a.msgUpdateDate).getTime());
      this.rowData = sortedData;
    });

    // start listening to filter updates
    this.sharedService.gridFiltersUpdates.subscribe(x => {
      MessageGridComponent.msgStatusFilter = x;
      this.gridApi.onFilterChanged();
    })

    this.context = { componentParent: this };

    this.rowCssRules = {
      "read": (params) => { return params.data.msgStatus === MessageStatus.Read },
      "answered": (params) => { return params.data.msgStatus === MessageStatus.Answered },
      "new": (params) => { return params.data.msgStatus === null }
    };

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

  }

  onRowClicked(params) {
    console.log('row clicked', params)
    //this.overlayService.open(MessagesDetailsComponent)
    //this.messageDetailsService.showMessageDetails(params.node.data)
  }

  private setColumnsVisibility() {
    this.columnApi.getAllColumns().forEach(col => {
      if (col.getColId().endsWith('desktop')) this.columnApi.setColumnVisible(col, this.deviceType === DeviceType.Desktop);
      if (col.getColId().endsWith('mobile')) this.columnApi.setColumnVisible(col, this.deviceType === DeviceType.Mobile);
    })
  }


  updateMessage(updatedMessage: Message, rowId: string) {
    updatedMessage.msgUpdateDate = new Date().toDateString();
    console.log('update status', updatedMessage);
    let itemToUpdate = [];
    itemToUpdate.push(updatedMessage)
    // update row node
    let row = this.gridApi.getRowNode(rowId);
    row.setData(updatedMessage);
    this.gridApi.refreshCells({ rowNodes: [row], force: true });

    // push new updated messages
    this.sharedService.pushMessages(this.rowData)

    this.updateSubject = this.communicationsService.updateMessageData();

    this.updateSubscription = this.updateSubject.subscribe(x => {
      console.log('done', x)
    })
    setTimeout(() => {
      this.updateSubject.next(updatedMessage);
    }, 2000);
  }

  openDetails(message: any) {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '500px',
      height: '700px;',
      data: message
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    //this.overlayService.open(MessageDialogComponent);
  }

  isExternalFilterPresent() {
    // if msg status is not all, then we are filtering
    return MessageGridComponent.msgStatusFilter != 'ALL';
  }

  doesExternalFilterPass(node) {
    console.log('change filters', MessageGridComponent.msgStatusFilter)
    switch (MessageGridComponent.msgStatusFilter) {
      case 'read': return node.data.msgStatus === "Read";
      case 'answered': return node.data.msgStatus === "Answered";
      case 'duplicate': return node.data.msgStatus === "Duplicate";
      case 'reject': return node.data.msgStatus === "Reject";
      default: return true;
    }
  }

}

