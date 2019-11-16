import { Injectable } from "@angular/core";
import { Subject, Observable, Observer } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CitihackService {
  constructor() {}

  private cacheSuject: Map<string, Subject<MessageEvent>> = new Map<string, Subject<MessageEvent>>();
  private subject: Subject<MessageEvent>;

  public connect(url): Subject<MessageEvent> {
    if (!this.cacheSuject.get(url)) { // this.subject) {
      this.subject = this.create(url);
      this.cacheSuject.set(url, this.subject);
      console.log('Successfully connected: ' + url);
   }
    return this.cacheSuject.get(url);
  }

  private create(url): Subject<MessageEvent> {
    const ws = new WebSocket(url);

    const observable = Observable.create((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });
    const observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
      // ,
      // complete: () => {
      //   if (ws.readyState === WebSocket.OPEN) {
      //     ws.close();
      //     console.log('Disconnect');
      //   }
      //}
    };
    return Subject.create(observer, observable);
  }
}
