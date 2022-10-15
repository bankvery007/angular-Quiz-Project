import { Injectable } from '@angular/core';
import { dataModel } from '../data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  data : dataModel = [
    {question: "1+1", number: 4, choice1: "1", choice2: "2", choice3: "10", choice4: "11", answer: 2, picture :"https://cdn.discordapp.com/attachments/1026870373700083732/1029786860471464026/Group_26.png"},
    {question: "ฟิวหล่อมาก", number: 2, choice1: "Yes", choice2: "No", choice3: "", choice4: "", answer: 1, picture: "https://cdn.discordapp.com/attachments/1026870373700083732/1029786860471464026/Group_26.png"}
  ]

  constructor() { }

  getAlldata(){
    return this.data;
  }
}
