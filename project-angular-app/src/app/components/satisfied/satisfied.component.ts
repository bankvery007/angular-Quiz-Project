import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ProfilemodalService } from 'src/app/service/profilemodal.service';
import { QuestionsService } from 'src/app/service/questions.service';
import { HistoryPlayingService } from 'src/app/service/history-playing.service';
@Component({
  selector: 'app-satisfied',
  templateUrl: './satisfied.component.html',
  styleUrls: ['./satisfied.component.css']
})
export class SatisfiedComponent implements OnInit {

  stars = [1,2,3,4,5];
  rating=0;

  updateRating(r:any){
    this.rating=r
    console.log(this.rating);``
  }

  ratingform = new FormGroup({
    owner: new FormControl(''),
    point: new FormControl(''),
    quizName:new FormControl(''),
    rating: new FormControl(''),
  });


  constructor(private router: Router,
    private ProfilemodalService:ProfilemodalService,
    private QuestionsService:QuestionsService,
    private hp:HistoryPlayingService) { }

  onclicktopath(){
    this.router.navigate(['/quiz']);
  }



  ngOnInit(): void {
  }

  addPlaying(){
    this.hp.addplaying(this.ratingform.value).subscribe(
      data => {
        alert('Playing added successfully');
        this.ratingform.reset();
      },
      err => {
        console.log(err);
      }
    );
  }

  

}
