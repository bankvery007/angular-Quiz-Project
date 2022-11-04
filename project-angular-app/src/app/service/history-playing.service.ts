import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HistoryPlayingService {

  constructor(private http: HttpClient) { }

  quiz: any
  user: any
  playing: any

  addQuiz(QuizData: any) {
    return this.http.post<any>('http://localhost:3000/quiz/Quiz', QuizData)
      .pipe(map(datas => {
        return datas;
      }));
  }

  getAllQuiz() {
    return this.http.get<any>('http://localhost:3000/quiz/Quiz')
      .pipe(map(newquiz => {
        if (newquiz) {
          this.quiz = newquiz;
        }
        return this.quiz;
      }));
  }

  getAllUser(){
    return this.http.get<any>('http://localhost:3000/user/getUser')
      .pipe(map(getuser => {
        if (getuser) {
          this.user = getuser;
        }
        return this.user;
      }));
  }

  addplaying(PlayingData: any){
    return this.http.post<any>('http://localhost:3000/history_playing/addplaying', PlayingData)
      .pipe(map(datas => {
        return datas;
    }));
  }

  getPlaying(){
    return this.http.get<any>('http://localhost:3000/history_playing/getplaying')
      .pipe(map(getplaying => {
        if (getplaying) {
          this.playing = getplaying;
        }
        return this.playing;
      }));
  }

}

