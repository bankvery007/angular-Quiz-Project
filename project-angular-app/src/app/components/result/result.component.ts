import { Component, Input, OnInit } from '@angular/core';
import { QuestionComponent } from '../question/question.component';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ProfilemodalService } from 'src/app/service/profilemodal.service';
import { QuestionsService } from 'src/app/service/questions.service';
import { HistoryPlayingService } from 'src/app/service/history-playing.service';
import { HistoryService } from 'src/app/service/history.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  @Input() correctAnswer!: number;
  Allquiz !: any
  user !: any

  constructor(private router: Router,
    private profile: ProfilemodalService,
    private QuestionsService: QuestionsService,
    private hr : HistoryService,
    private hp: HistoryPlayingService) { }

  ngOnInit(): void {
    console.log("reslut", this.correctAnswer)
    this.Allquiz = this.QuestionsService.getQuestion()
    this.user = this.profile.getUser()

  }

  stars = [1, 2, 3, 4, 5];
  rating = 0;

  updateRating(r: any) {
    this.rating = r
    console.log(this.rating); ``
  }

  getDateNow() {
    return [new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear()].join('/')
  }

  onclicktopath() {
    this.router.navigate(['/quiz']);
  }

  addPlaying() {
    this.hp.addplaying(
      {
        owner: this.user.username,
        point: this.correctAnswer,
        datetime: this.getDateNow(),
        quizName: this.Allquiz.quizName,
      }
    ).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }

  
  addRating() {
    this.hr.addRating(
      {
        owner: this.user.username,
        rating: this.rating,
        datetime: this.getDateNow(),
        quizName: this.Allquiz.quizName,
      }
    ).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }

  CallAll(){
    this.addPlaying();
    this.onclicktopath();
    this.addRating();
  }
}

