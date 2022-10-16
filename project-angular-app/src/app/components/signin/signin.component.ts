import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { LoginService } from 'src/app/service/login.service';
import { Injectable } from '@angular/core';

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
    passowrd: new FormControl('', [Validators.required]),
  });

  constructor(private loginService :LoginService) { }

  ngOnInit(): void {
  }

  // onClickLogin() {
  //   this.loginService.onClickLogin();
      
  // }

}
