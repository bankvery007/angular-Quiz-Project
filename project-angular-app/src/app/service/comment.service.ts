import { Injectable } from '@angular/core';
import { commentModel } from '../comment.model';


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  comment : commentModel = [
    {name: "patcharachart", text: "Good!"},
    {name: "kuyyai", text: "lnwza007"},
    {name: "xxxxx", text: "porn!"},
    {name: "test", text: "test!"},
    {name: "A", text: "Good!"},
    {name: "B", text: "Good!"},
    {name: "Cat", text: "Good!"},
    {name: "ควาย", text: "เกมโง่ๆ"},
    {name: "อิอิ", text: "โคตรยาววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววววว"},

  ]

  constructor() { }

  getAllcomment(){
    return this.comment;
  }
}
