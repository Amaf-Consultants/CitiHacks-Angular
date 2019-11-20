import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {

  constructor() { }


  tiles: Tile[] = [
    { text: 'TopBar', cols: 4, rows: 1, color: 'darkblue' },
    { text: 'MessageCenter', cols: 1, rows: 7, color: 'lightblue' },
    { text: 'EventDetails', cols: 3, rows: 1, color: 'lightgreen' },
    { text: 'DashboarAnalytics', cols: 3, rows: 2, color: '#EEECE7' },
    // {text: 'EventDuration', cols: 1, rows: 1, color: 'lightpink'},
    // {text: 'Subscribers', cols: 1, rows: 1, color: '#DDBDF1'},
    // {text: 'MessageInqueu', cols: 1, rows: 1, color: '#DDBDF1'},
    // {text: 'Rejected', cols: 1, rows: 1, color: '#DDBDF1'},
    // {text: 'Answered', cols: 1, rows: 1, color: '#DDBDF1'},
    // {text: 'UnRead', cols: 1, rows: 1, color: '#DDBDF1'},
    { text: 'MessageGrid', cols: 3, rows: 2, color: '#DDBDF1' },
    { text: 'MessageDetails', cols: 3, rows: 2, color: '#DDBDF1' },
  ];

  //   test = {
  //     inputMessage: {
  //      msgId: '52e50a37',
  //      userId: 95,
  //      eventId: 9,
  //      msgQuality: 2,
  //      msgAppType: 'Web',
  //      message: 'This is Testing Message18197',
  //      msgStatus: 'Read',
  //      msgCreateDate: '1573179699945',
  //      msgUpdateDate: '1573179699954',
  //      msgAttachement: ''
  //   },typeId: 1
  //  };

  test = {
    msgId: '52e50a37',
    userId: 95,
    eventId: 9,
    msgQuality: 2,
    msgAppType: 'Web',
    message: 'This is Testing Message18197',
    msgStatus: 'Read',
    msgCreateDate: '1573179699945',
    msgUpdateDate: '1573179699954',
    msgAttachement: ''
  };



  sendMsg() {
    console.log('new message from client to websocket: ', 'Testing message');
  }

  ngOnInit(): void {
    const loc = ['Canada', 'USA', 'UK', 'Singapore', 'India', 'Brazil', 'Tempa', 'Mississauga', 'Australia', 'Dubai'];
    const MsgAppType = ['Web', 'Mobile'];
    const msgAction = ['Read', 'Duplicate', 'Deleted', 'Rejected', 'Answered'];
    const event = [];
    const user = [];
    const msg = [];
    // for (let i = 0; i < 10; i++) {
    // event.push({
    //   'EventId': i,
    //   'EventName': 'Citi' + i,
    //   'EventLocation': loc[i],
    //   'EventHostName': 'Ali' + i,
    //   'EventDuration': 2,
    //   'EventStartDate': (Date.now() + i).toString(),
    //   'EventEndDate': (Date.now() + i * 2).toString(),
    //   'EventPresenter': 'Shajran' + i,
    //   'EventSubscribers': 200,
    //   'EventRating': Math.floor(Math.random() * (9 - 0 + 1) + 0)
    //   });
    //    for (let j = 0; j < 100; j++) {
    // user.push({
    //     'Id': j,
    //     'Name': 'User' + j,
    //     'SiteLocation': loc[Math.floor(Math.random() * (9 - 0 + 1) + 0)],
    //     'Department': 'Engineering' + Math.floor(Math.random() * (9 - 0 + 1) + 0),
    //     'EventId': i
    //   });
    //       for (let k = 1; k < 30; k++) {
    // msg.push({
    //   'MsgId':uuid.v4(),
    //   'UserId': 'User' + j,
    //   'EventId': i,
    //   'MsgQuUserty': 2,
    //   'MsgAppType': MsgAppType[Math.floor(Math.random() * (1 - 0 + 1) + 0)],
    //   'Message': 'This is Testing Message' + k + Math.floor(Math.random() * (200 - 1 + 1) + 1),
    //   'MsgStatus' : msgAction[Math.floor(Math.random() * (4 - 0 + 1) + 0)],
    //   'MsgCreateDate': (Date.now() + i).toString(),
    //   'MsgUpdateDate': (Date.now() + i * 2).toString(),
    //   'MsgAttachement': ''
    //   });
    //    }
    // console.log(JSON.stringify(msg));
    //    }
    // console.log(JSON.stringify(msg));
    //  }
    // console.log(JSON.stringify(event));
    // console.log(JSON.stringify(user));
    // console.log(JSON.stringify(msg));
  };

}


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
