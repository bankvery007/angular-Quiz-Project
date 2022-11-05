import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ProfilemodalService } from 'src/app/service/profilemodal.service';


@Component({
  selector: 'app-profilemodal',
  templateUrl: './profilemodal.component.html',
  styleUrls: ['./profilemodal.component.css']
})
export class ProfilemodalComponent implements OnInit {

  constructor(
    private router: Router, 
    private profilemodal: ProfilemodalService,
    private appComponent: AppComponent
    ) { }

  user!:any

  currentProfile:any = this.getUser()

  ngOnInit(): void {
  }

  onClickLogout(){
    window.localStorage.setItem("token", "");
    this.appComponent.haveToken()
    this.router.navigate(['./signin']);
  }

  setUser(user:any){
    return this.profilemodal.setUser(user);
  }

  getUser(){
    return this.profilemodal.getUser();
  }
}
