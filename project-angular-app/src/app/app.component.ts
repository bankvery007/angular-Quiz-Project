import { Component, OnInit } from '@angular/core';
import { ProfilemodalService } from './service/profilemodal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-test';

  token!: string
  pass:boolean = false

  constructor(
    private profile: ProfilemodalService
  ) {}

  ngOnInit(): void {
  }

  haveToken(){
    this.token = this.profile.getToken()
    if(this.token){
      this.pass = true
    }
    console.log(this.pass)
  }
  
}
