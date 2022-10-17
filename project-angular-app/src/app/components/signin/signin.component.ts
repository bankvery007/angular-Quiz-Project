import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { LoginService } from 'src/app/service/login.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  onClickLogin() {
    this.http.post('http://localhost:3000/login/signin',
      { "username": this.loginForm.value.username || '', "password": this.loginForm.value.password || '' })
      .subscribe({
        next: (data) => {
          if ((<any>Object).values(data)[0] != false) {
            console.log((<any>Object).values(data)[0])
            console.log((<any>Object).values(data)[1])
            window.localStorage.setItem("token", (<any>Object).values(data)[1]);
            // localStorage.setItem("token",this.nameKey.nativeElement.value);

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

