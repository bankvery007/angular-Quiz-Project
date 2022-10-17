import { Injectable } from '@angular/core';
import { dataModel } from '../data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  data: dataModel = [

    {
      quizName: "quizname1", datetime: "17/10/2022", count:0, quiz: [
        { question: "question1", choice1: "choice1", choice2: "choice2", choice3: "choice3", choice4: "choice4", answer: 1, pic: "https://cdn.discordapp.com/attachments/1026870373700083732/1029786860471464026/Group_26.png" },
        { question: "question2", choice1: "choice1", choice2: "choice2", choice3: "choice3", choice4: "choice4", answer: 1, pic: "https://cdn.discordapp.com/attachments/1026870373700083732/1029786860471464026/Group_26.png" },
      ]
    },
    {
      quizName: "OOOOOOOOOOOOOOOOOOOOOOOOOOOOOO", datetime: "17/10/2022", count:0, quiz: [
        { question: "question1", choice1: "choice1", choice2: "choice2", choice3: "choice3", choice4: "choice4", answer: 1, pic: "https://cdn.discordapp.com/attachments/1026870373700083732/1029786860471464026/Group_26.png" },
        { question: "question2", choice1: "choice1", choice2: "choice2", choice3: "choice3", choice4: "choice4", answer: 1, pic: "https://cdn.discordapp.com/attachments/1026870373700083732/1029786860471464026/Group_26.png" },
      ]
    },
    {
      quizName: "quizname3", datetime: "17/10/2022", count:0, quiz: [
        { question: "question1", choice1: "choice1", choice2: "choice2", choice3: "choice3", choice4: "choice4", answer: 1, pic: "https://cdn.discordapp.com/attachments/1026870373700083732/1029786860471464026/Group_26.png" },
        { question: "question2", choice1: "choice1", choice2: "choice2", choice3: "choice3", choice4: "choice4", answer: 1, pic: "https://cdn.discordapp.com/attachments/1026870373700083732/1029786860471464026/Group_26.png" },
      ]
    },

    // {question: "1+1", number: 4, choice1: "1", choice2: "2", choice3: "10", choice4: "11", answer: 2, picture :"https://cdn.discordapp.com/attachments/1026870373700083732/1029786860471464026/Group_26.png"},
    // {question: "ฟิวหล่อมาก", number: 2, choice1: "Yes", choice2: "No", choice3: "", choice4: "", answer: 1, picture: "https://cdn.discordapp.com/attachments/1026870373700083732/1029786860471464026/Group_26.png"}
  ]

  constructor() { }

  getAlldata() {
    return this.data;
  }
}
