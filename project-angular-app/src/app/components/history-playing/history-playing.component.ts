import { Component, OnInit } from '@angular/core';
import { HistoryPlayingService } from 'src/app/service/history-playing.service';
import { ProfilemodalService } from 'src/app/service/profilemodal.service';
@Component({
  selector: 'app-history-playing',
  templateUrl: './history-playing.component.html',
  styleUrls: ['./history-playing.component.css']
})
export class HistoryPlayingComponent implements OnInit {

  playing !: any;
  user!:any;
  owner!:any;

  constructor(private hs : HistoryPlayingService,
    private profile : ProfilemodalService) { }

  ngOnInit(): void {
    this.onLoading();
    this.user = this.profile.getUser()
  }

  onLoading(){
    try{
      this.hs.getPlaying().subscribe(
        data => {
          this.playing = data;
          console.log(this.playing)
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


