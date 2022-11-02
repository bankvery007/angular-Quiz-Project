import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { LoginService } from 'src/app/service/login.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { QuizComponent } from '../quiz/quiz.component';
import { ProfilemodalService } from 'src/app/service/profilemodal.service';
import { AppComponent } from 'src/app/app.component';


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  @ViewChild('token') nameKey!: ElementRef;

  constructor(
    private http: HttpClient, 
    private router: Router,
    private profile:ProfilemodalService,
    private appComponent: AppComponent,
    ) { }

  ngOnInit(): void {
  }

  user!: any


  onClickLogin() {
    this.http.post('http://localhost:3000/login/signin',
      { "username": this.loginForm.value.username || '', "password": this.loginForm.value.password || '' })
      .subscribe({
        next: (data) => {
          if ((<any>Object).values(data)[0] != false) {
            console.log((<any>Object).values(data)[0])
            console.log((<any>Object).values(data)[1])
            this.user = (<any>Object).values(data)[0]

            this.profile.setUser(
              {
                id: this.user.id,
                name: this.user.name,
                username: this.user.username, 
                email: this.user.email, 
                title: this.user.title, 
                sex: this.user.username,
                phonenumber: this.user.phonenumber,
                picture: this.user.picture, 
                birthyear: this.user.birthyear, 
              })

            this.profile.setToken((<any>Object).values(data)[1])
            
            this.appComponent.haveToken()
            
            window.localStorage.setItem("token", (<any>Object).values(data)[1]);
            alert("welcome!")
            this.router.navigate(['./quiz']);

          } else {
            alert("your username or password is incorrect")

          }
        },
        error: (error) => {
          alert("your username or password is incorrect")
        }
      })

  }}

