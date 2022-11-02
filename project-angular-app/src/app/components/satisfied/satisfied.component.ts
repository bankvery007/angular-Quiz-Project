import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private router: Router,) { }

  onclicktopath(){
    this.router.navigate(['/quiz']);

  }


  ngOnInit(): void {
  }

}
