import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ProfilemodalService } from 'src/app/service/profilemodal.service';
import { HistoryService } from 'src/app/service/history.service';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profilemodal',
  templateUrl: './profilemodal.component.html',
  styleUrls: ['./profilemodal.component.css']
})
export class ProfilemodalComponent implements OnInit {

  constructor(
    private router: Router, 
    private profilemodal: ProfilemodalService,
    private appComponent: AppComponent,
    private history:HistoryService,
    private http:HttpClient
    ) { }

  user!:any

  count :any=this.getCountPlayHistory();

  currentProfile:any = this.getUser();

  show:boolean=false;

  profileForm = new FormGroup({
    firstName:  new FormControl('',[Validators.required,Validators.maxLength(30)]),
    lastName: new FormControl('',[Validators.required,Validators.maxLength(30)]),
    sex: new FormControl('',[Validators.required,Validators.maxLength(6)]),
    birthyear: new FormControl('',[Validators.required,Validators.pattern('[0-9]{4}'),Validators.max(2021),Validators.min(1900)]),
    phonenumber: new FormControl('',[Validators.required,Validators.pattern('[0][0-9]{9}')]),
    email: new FormControl('',[Validators.required,Validators.email]),
  });

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

  getCountPlayHistory(){
    return this.history.getCountPlayHistory();
  }

  onClickEdit(){
    this.show = !this.show;
  }

  onClickSubmit() {
    //unknown -> any
    const patchjson:JSON = <JSON><any>{
        name: this.profileForm.value.firstName+' '+this.profileForm.value.lastName|| '',
        sex: this.profileForm.value.sex || '',
        birthyear: parseInt(this.profileForm.value.birthyear || ''),
        phonenumber: parseInt(this.profileForm.value.phonenumber || ''),
        email: this.profileForm.value.email || '',
    }
    
    this.http.patch('http://localhost:3000/user/updateuser',patchjson
      )
      .subscribe({
        next: (data) => {
          if ((<any>Object).values(data)[0] != false) {
            alert("success!")
          } else {
            alert("failed")
          }
        },
        error: (error) => {
          alert("cannot sign up")
        }
      })
  }
}
