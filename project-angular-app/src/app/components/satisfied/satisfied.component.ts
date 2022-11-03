import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
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

  // ratingform = new FormGroup({
  //   owner: new FormControl(''),
  //   rating: new FormControl(''),
  // });

  // get start() { return this.ratingform.get('rating') }

  constructor(private router: Router,) { }

  onclicktopath(){
    this.router.navigate(['/quiz']);
  }



  ngOnInit(): void {
  }

}
