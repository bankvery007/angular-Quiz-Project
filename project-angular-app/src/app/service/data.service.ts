import { Injectable } from '@angular/core';
import { dataModel } from '../data.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  constructor(private http: HttpClient) { }

  quiz: any

  addQuiz(QuizData: any) {
    return this.http.post<any>('http://localhost:3000/quiz/addQuiz', QuizData)
      .pipe(map(datas => {
        return datas;
      }));
  }

  getAllQuiz() {
    return this.http.get<any>('http://localhost:3000/quiz/getQuiz')
      .pipe(map(newquiz => {
        if (newquiz) {
          this.quiz = newquiz;
        }
        return this.quiz;
      }));
  }

  // getAllData(){
  //   return this.data
  // }

}
