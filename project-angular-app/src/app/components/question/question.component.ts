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


  interval$: any;
  Allquiz!: any
  quiz!: any
  timerInterval!: any
  counter: number = 60;
  correctAnswer: number = 0;
  nextQuestion: number = 0;
  point: number = 0;
  bonus: number = 0
  toggle !: boolean;
  isQuizCompleted: boolean = false;
  isCorrect: boolean = false
  disabled: boolean = false

  color: string[] = ['white', 'white', 'white', 'white']

  constructor(
    private QuestionsService: QuestionsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.correctAnswer = 0;
    this.Allquiz = this.QuestionsService.getQuestion()
    this.quiz = this.Allquiz.quiz[this.nextQuestion]
    this.questionList = this.Allquiz.quiz
    console.log(this.Allquiz)
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
      this.color[value - 1] = 'green'
      // this.point = 1
      this.point = Math.round((1000 + this.bonus) / 60 * this.counter)
      this.correctAnswer += this.point;
      this.bonus += this.bonus + 50
    } else {
      this.color[value - 1] = 'red'
      this.point = 0
      this.bonus = 0
    }
    if ((this.nextQuestion + 1) === this.Allquiz.quiz.length) {
      this.isQuizCompleted = true;
      this.stopCounter();
      Swal.fire({
        title: this.correctAnswer == 0 ? "Try again!!" : "Congratulations!!",
        html: 'You score is ' + this.correctAnswer + ' points',
        width: 600,
        padding: '3em',
        color: '#716add',
        background: '#fff',
        backdrop: `
          rgba(0,0,123,0.4)
          url('assets/image/giphy.gif')
        `
      }).then(() => {
        //xxxx
      })
    } else {
      this.nextQuestion += 1
      this.disabled = true
      setTimeout(() => {
        this.quiz = this.Allquiz.quiz[this.nextQuestion]
        this.color[value - 1] = 'white'
        this.disabled = false
        this.resetCounter()
      }, 1000);
    }
  }

  startCounter() {
    this.interval$ = interval(1000)//วินาที
      .subscribe(val => {
        this.counter--;
        if (this.counter === 0) {
          this.nextQuestion += 1
          this.bonus = 0
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
