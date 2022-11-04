import { Component, Input, OnInit } from '@angular/core';
import { QuestionComponent } from '../question/question.component';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ProfilemodalService } from 'src/app/service/profilemodal.service';
import { QuestionsService } from 'src/app/service/questions.service';
import { HistoryPlayingService } from 'src/app/service/history-playing.service';
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

  ratingform = new FormGroup({
    owner: new FormControl(''),
    point: new FormControl(''),
    quizName: new FormControl(''),
    rating: new FormControl(''),
  });


  onclicktopath() {
    this.router.navigate(['/quiz']);
  }

  // comment: this.productForm.value.comment,

  addPlaying() {
    this.hp.addplaying(
      {
        owner: this.user.username,
        point: this.correctAnswer,
        quizName: this.Allquiz.quizName,
        rating: this.rating,
      }
    ).subscribe(
      data => {
        alert('Playing added successfully');
        this.ratingform.reset();
      },
      err => {
        console.log(err);
      }
    );
  }

  CallAll(){
    this.addPlaying();
    this.onclicktopath();
  }
}

