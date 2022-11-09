import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {


  constructor( private http: HttpClient,
    private login: LoginService) {}

    quiz: any
    user: any
    rating: any

    addQuiz(QuizData: any) {
      return this.http.post<any>('http://localhost:3000/quiz/Quiz', QuizData, {headers : this.login.getToken()})
        .pipe(map(datas => {
          return datas;
        }));
    }
  
    getAllQuiz() {
      return this.http.get<any>('http://localhost:3000/quiz/Quiz', {headers : this.login.getToken()})
        .pipe(map(newquiz => {
          if (newquiz) {
            this.quiz = newquiz;
          }
          return this.quiz;
        }));
    }
  
    getAllUser(){
      return this.http.get<any>('http://localhost:3000/user/getUser', {headers : this.login.getToken()})
        .pipe(map(getuser => {
          if (getuser) {
            this.user = getuser;
          }
          return this.user;
        }));
    }
  
    addRating(RatingData: any){
      return this.http.post<any>('http://localhost:3000/history_rating/addrating', RatingData, {headers : this.login.getToken()})
        .pipe(map(datas => {
          return datas;
      }));
    }
  
    getRating(){
      return this.http.get<any>('http://localhost:3000/history_rating/getrating', {headers : this.login.getToken()})
        .pipe(map(getrating => {
          if (getrating) {
            this.rating = getrating;
          }
          return this.rating;
        }));
    }
  
}
