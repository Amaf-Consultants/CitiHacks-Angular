import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoMaterialModule } from './material-module';
import { MessageCenterComponent } from './components/message-center/message-center.component';
import { MessageGridComponent } from './components/message-grid/message-grid.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { MessagesListComponent } from './components/messages-list/messages-list.component';
import { MessagesDetailsComponent } from './components/messages-details/messages-details.component';
import { DashboardAnalyticsComponent } from './components/dashboard-analytics/dashboard-analytics.component';
import { CitihackService } from './components/service/citihack.service';
import {CommunicationService} from './components/service/communication.service';
import { SidenavListComponent } from './components/sidenav-list/sidenav-list.component';
import { HomeComponent } from './views/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageCenterComponent,
    MessageGridComponent,
    TopBarComponent,
    EventDetailsComponent,
    MessagesListComponent,
    MessagesDetailsComponent,
    DashboardAnalyticsComponent,
    SidenavListComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DemoMaterialModule,
    FlexLayoutModule
  ],
  providers: [CitihackService, CommunicationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
