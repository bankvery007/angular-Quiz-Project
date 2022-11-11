import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient, 
    private login: LoginService
    ) { }

  quiz: any
  user: any

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

  editQuiz(id: any, QuizData: any) {
    return this.http.patch<any>('http://localhost:3000/quiz/Quiz/' + id, QuizData , {headers : this.login.getToken()})
      .pipe(map(datas => {
        return datas;
      }));
  }

  delQuiz(id: string) {
    console.log("dataSer",id)
    return this.http.delete<any>('http://localhost:3000/quiz/Quiz/delete/' + id , {headers : this.login.getToken()})
      .pipe(map(datas => {
        console.log("dataSer",datas)
        return datas;
      }));
  }

  getAllUser(){
    return this.http.get<any>('http://localhost:3000/user/getUser' , {headers : this.login.getToken()})
      .pipe(map(getuser => {
        if (getuser) {
          this.user = getuser;
        }
        return this.user;
      }));
  }

}
