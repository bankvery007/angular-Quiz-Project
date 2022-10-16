import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  

  profileForm = new FormGroup({
    picture: new FormControl('',[Validators.required]),
    title: new FormControl('',[Validators.required]),
    firstName:  new FormControl('',[Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    sex: new FormControl('',[Validators.required]),
    birthyear: new FormControl('',[Validators.required]),
    phonenumber: new FormControl('',[Validators.required,Validators.pattern('[0][0-9]{9}')]),
    username: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required]),
    confirmpass : new FormControl('',[Validators.required]),
  });

  
  

  get email() {return this.profileForm.get('email');}
  get phonenumber() {return this.profileForm.get('phonenumber');}
  get password() {return this.profileForm.get('password');}
  get confirmpass() {return this.profileForm.get('confirmpass');}

  constructor() { }

  ngOnInit(): void {
  }


}
