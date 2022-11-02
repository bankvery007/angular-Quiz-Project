import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionsService } from 'src/app/service/questions.service';

import { DataService } from 'src/app/service/data.service';
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
  quiz: any;

  constructor(private QuestionsService : QuestionsService,
              private dataService: DataService) { }

  ngOnInit(): void {
    
    this.startCounter();
    this.getAllQuiz();
    this.onLoading();
    this.correctAnswer=0;
  }

  // getAllQuestions(){
  //   this.dataService.getAllQuiz()
  //     .subscribe(res=>{
  //       this.questionList = res.quiz;
  //       console.log(res);
  //     })
  // }

  onLoading() {
    try {
      this.dataService.getAllQuiz().subscribe(
        data => {
          this.quiz = data ;
          this.questionList = this.quiz
          console.log(this.quiz);
        },
        err => {
          console.log(err);
        }
      );

    } catch (err) {
      console.log(err);
    }
  }


  getAllQuiz() {
    return this.dataService.getAllQuiz()
  }


  // nextQuestion() {
  //   this.currentQuestion++;
  // }

  // answer(currentQno: number, option: any) {

  //   if(currentQno === this.questionList.length) {
  //     setTimeout(() => {
  //       this.isQuizCompleted = true;
  //       this.stopCounter();
  //     }, 1000)
  //   }
  //   if (option.correct) {
  //     this.correctAnswer++;
  //     setTimeout(() => {
  //       this.currentQuestion++;
  //       this.resetCounter();
  //     }, 1000)

  //   } else {
  //     setTimeout(() => {
  //       this.currentQuestion++;
  //       this.resetCounter();
  //     }, 1000);
  //   }
  // }

  startCounter() {
    this.interval$ = interval(1000)//วินาที
      .subscribe(val => {
        this.counter--;
        if (this.counter === 0) {
          // this.currentQuestion++;
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
