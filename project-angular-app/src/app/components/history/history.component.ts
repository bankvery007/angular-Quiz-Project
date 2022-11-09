import { Component, OnInit } from '@angular/core';
import { HistoryService } from 'src/app/service/history.service';
import { ProfilemodalService } from 'src/app/service/profilemodal.service';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {


  rating !: any;
  user!:any;

  constructor(private hs : HistoryService,
    private profile : ProfilemodalService) { }

  ngOnInit(): void {
    this.onLoading();
    this.user = this.profile.getUser()
  }

  onLoading(){
    try{
      this.hs.getRating().subscribe(
        data => {
          this.rating = data;
          console.log(this.rating)
        },
        err => {
          console.log(err);
        }
      );
    }catch(err){
      console.log(err);
    }
  }

}


