import { Injectable } from '@angular/core';
import { historyModel } from '../history.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  // history: historyModel

  constructor(private http: HttpClient) {
    // this.history = this.getHistory();
  }

  getHistory() {
    this.http.get<any>('http://localhost:3000/history/getHistory')
      .pipe(map(history => {
        if (history) {
          return history
        } else {
          alert('cannot get history')
        }
      }));

  }

  getCountPlayHistory() {
    this.http.get<any>('http://localhost:3000/history/getCountPlayHistory')
      .pipe(map(countplay => {
        if (countplay) {
          return countplay
          
        } else {
          alert('cannot get count played history')
        }
      }));

  }
}
