import { AgGridModule } from '@ag-grid-community/angular';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnalyticsCardComponent } from './components/analytics-card/analytics-card.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { DashboardAnalyticsComponent } from './components/dashboard-analytics/dashboard-analytics.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { MessageCenterComponent } from './components/message-center/message-center.component';
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';
import { CheckboxComponent } from './components/message-grid/checkbox/checkbox.component';
import { MessageGridComponent } from './components/message-grid/message-grid.component';
import { MessageStatusComponent } from './components/message-grid/message-status/message-status.component';
import { MessagesDetailsComponent } from './components/messages-details/messages-details.component';
import { MessagesListComponent } from './components/messages-list/messages-list.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { SidenavListComponent } from './components/sidenav-list/sidenav-list.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { DemoMaterialModule } from './material-module';
import { HomeComponent } from './views/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    MessageCenterComponent,
    MessageStatusComponent,
    MessageGridComponent,
    TopBarComponent,
    EventDetailsComponent,
    MessagesListComponent,
    MessagesDetailsComponent,
    DashboardAnalyticsComponent,
    SidenavListComponent,
    HomeComponent,
    PieChartComponent,
    AnalyticsCardComponent,
    CheckboxComponent,
    MessageDialogComponent,
    CreateEventComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    DemoMaterialModule,
    FlexLayoutModule,
    DeviceDetectorModule.forRoot(),
    AgGridModule.withComponents([CheckboxComponent, MessageStatusComponent, MessagesDetailsComponent]),
    NgxMaterialTimepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [MessageDialogComponent, CreateEventComponent]
})
export class AppModule { }
