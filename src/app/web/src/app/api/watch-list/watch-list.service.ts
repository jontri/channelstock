import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, defer, Subject } from 'rxjs';
import { WatchList } from '@models';
import { Injectable, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WatchListService {

  private WATCH_LIST_SERVICE_URL = '/services/WatchListService';

  private list: WatchList[];
  private addEvent: EventEmitter<WatchList>;
  private removeEvent: EventEmitter<number>;
  username: string;

  expandListener = new Subject();

  constructor(private httpClient: HttpClient) {
    this.list = [];
    this.addEvent = new EventEmitter<WatchList>();
    this.removeEvent = new EventEmitter<number>();
    this.username = sessionStorage.getItem('LOGGED_USER');
  }

  getWatchList(): Observable<WatchList[]> {
    if (sessionStorage.getItem('LOGGED_USER')) {
      this.username = sessionStorage.getItem('LOGGED_USER');
    } else {
      this.username = null;
    }
    return this.httpClient.get<WatchList[]>(this.WATCH_LIST_SERVICE_URL + '/' + this.username).pipe(
      map((data) => {
        return this.list = data['Watcher'];
      })
    );
  }

  addItemToWatchList(Watcher: WatchList): Observable<WatchList> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    const jsonObj = JSON.stringify({Watcher});

    return this.httpClient.post<WatchList>(this.WATCH_LIST_SERVICE_URL, jsonObj, httpOptions).pipe(
      map((data) => {
        this.list.push(Watcher);
        this.addEvent.emit(Watcher);
        return data;
      })
    );
  }

  removeItemFromWatchList(stockSymbol: String) {
    const index = this.list.findIndex((watcher) => watcher.company.symbol === stockSymbol);
    return this.httpClient.delete(this.WATCH_LIST_SERVICE_URL + '/' + stockSymbol + '/' + this.username).pipe(
      map((data) => {
        this.list.splice(index, 1);
        this.removeEvent.emit(index);
        return data;
      })
    );
  }

  get watchList(): WatchList[] {
    return this.list;
  }

  get addEventEmitter(): EventEmitter<WatchList> {
    return this.addEvent;
  }

  get removeEventEmitter(): EventEmitter<number> {
    return this.removeEvent;
  }
}
