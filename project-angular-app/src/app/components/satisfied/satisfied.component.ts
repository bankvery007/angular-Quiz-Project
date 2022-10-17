import { Component, OnInit } from '@angular/core';

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
  }
  constructor() { }


  ngOnInit(): void {
  }

}
