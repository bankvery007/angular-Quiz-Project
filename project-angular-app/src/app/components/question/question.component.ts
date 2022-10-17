import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionsService } from 'src/app/service/questions.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  public name: string = "";
  public questionList: any = [];
  public currentQuestion: number = 0;
  counter = 60;
  correctAnswer: number = 0;
  interval$: any;
  isQuizCompleted : boolean = false;

  constructor(private QuestionsService : QuestionsService) { }

  ngOnInit(): void {
    this.getAllQuestions();
    this.startCounter();
    this.correctAnswer=0;
  }
  getAllQuestions(){
    this.QuestionsService.getQuestionJson()
      .subscribe(res=>{
        this.questionList = res.questions;
        console.log(res);
      })
  }
  nextQuestion() {
    this.currentQuestion++;
  }
  answer(currentQno: number, option: any) {

    if(currentQno === this.questionList.length) {
      setTimeout(() => {
        this.isQuizCompleted = true;
        this.stopCounter();
      }, 1000)
    }
    if (option.correct) {
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
      }, 1000)

    } else {
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
      }, 1000);
    }
  }

  startCounter() {
    this.interval$ = interval(1000)//วินาที
      .subscribe(val => {
        this.counter--;
        if (this.counter === 0) {
          this.currentQuestion++;
          this.counter = 60;
        }
      });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }
  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }
  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }
}
