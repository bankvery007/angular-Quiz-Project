import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private http: HttpClient,
    private login: LoginService
    ) { }

  comment: any

  addComment(CommentData: any) {
    return this.http.post<any>('http://localhost:3000/comment/addComment', CommentData, {headers : this.login.getToken()})
      .pipe(map(datas => {
        return datas;
      }));
  }

  getAllcomment() {
    return this.http.get<any>('http://localhost:3000/comment/getComment', {headers : this.login.getToken()})
      .pipe(map(newcomment => {
        if (newcomment) {
          this.comment = newcomment;
        }
        return this.comment;
      }));
  }

}
