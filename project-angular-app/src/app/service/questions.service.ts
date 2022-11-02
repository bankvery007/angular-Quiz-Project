import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  Question! : any

  constructor(private http : HttpClient) { }

  setQuestion(q : any){
    this.Question = q
  }

  getQuestion(){
    return this.Question
  }
}
