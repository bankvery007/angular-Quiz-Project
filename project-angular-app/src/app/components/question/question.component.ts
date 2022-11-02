import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { QuestionsService } from 'src/app/service/questions.service';
import Swal from 'sweetalert2';


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
  isQuizCompleted: boolean = false;
  Allquiz!: any
  quiz!: any
  nextQuestion: number = 0;
  timerInterval!:any

  constructor(
    private QuestionsService: QuestionsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.correctAnswer = 0;
    this.Allquiz = this.QuestionsService.getQuestion()
    this.quiz = this.Allquiz.quiz[this.nextQuestion]
    console.log("quiz",this.quiz)
    this.start()
  }

  start() {
    Swal.fire({
      title: 'Are you ready?!',
      html: 'Game will start in 5 seconds.',
      timer: 5000,
      timerProgressBar: true,
      confirmButtonText: 'Start now!'
    }).then((result) => {
      this.startCounter();
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
  }

  answer(value: number) {
    if (value == this.quiz.answer) {
      this.correctAnswer += 1
    }
    if ((this.nextQuestion + 1) === this.Allquiz.quiz.length) {
      Swal.fire({
        title: 'Congratulations!!',
        html: 'You score is '+ this.correctAnswer +' points',
        width: 600,
        padding: '3em',
        color: '#716add',
        background: '#fff url(/images/trees.png)',
        backdrop: `
          rgba(0,0,123,0.4)
          https://giphy.com/embed/GkD4U3VfiIbzcBhQNu
          left top
          no-repeat
        `
      }).then((result) => {
        this.router.navigate(['/quiz']);
      })
    } else {
      this.nextQuestion += 1
      this.quiz = this.Allquiz.quiz[this.nextQuestion]
      this.resetCounter()
    }

  }

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
