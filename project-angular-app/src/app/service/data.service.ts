import { Injectable } from '@angular/core';
import { dataModel } from '../data.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  quiz: any
  user: any

  addQuiz(QuizData: any) {
    return this.http.post<any>('http://localhost:3000/quiz/Quiz', QuizData)
      .pipe(map(datas => {
        return datas;
      }));
  }

  getAllQuiz() {
    const headers = new HttpHeaders().set('authorization', `${localStorage.getItem("token")}`);
    console.log("getAllQuiz",headers)
    return this.http.get<any>('http://localhost:3000/quiz/Quiz', {headers : headers})
      .pipe(map(newquiz => {
        if (newquiz) {
          this.quiz = newquiz;
        }
        return this.quiz;
      }));
  }

  editQuiz(id: any, QuizData: any) {
    return this.http.patch<any>('http://localhost:3000/quiz/Quiz/' + id, QuizData)
      .pipe(map(datas => {
        return datas;
      }));
  }

  delQuiz(id: string) {
    console.log("dataSer",id)
    return this.http.delete<any>('http://localhost:3000/quiz/Quiz/delete/' + id)
      .pipe(map(datas => {
        console.log("dataSer",datas)
        return datas;
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

}
