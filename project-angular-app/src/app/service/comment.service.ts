import { Injectable } from '@angular/core';
import { commentModel } from '../comment.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  comment: any

  addComment(CommentData: any) {
    return this.http.post<any>('http://localhost:3000/comment/addComment', CommentData)
      .pipe(map(datas => {
        return datas;
      }));
  }

  getAllcomment() {
    return this.http.get<any>('http://localhost:3000/comment/getComment')
      .pipe(map(newcomment => {
        if (newcomment) {
          this.comment = newcomment;
        }
        return this.comment;
      }));
  }

}
