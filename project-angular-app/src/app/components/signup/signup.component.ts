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
    firstName:  new FormControl('',[Validators.required,Validators.maxLength(30)]),
    lastName: new FormControl('',[Validators.required,Validators.maxLength(30)]),
    sex: new FormControl('',[Validators.required,Validators.maxLength(6)]),
    birthyear: new FormControl('',[Validators.required,Validators.pattern('[0-9]{4}'),Validators.max(2021),Validators.min(1900)]),
    phonenumber: new FormControl('',[Validators.required,Validators.pattern('[0][0-9]{9}')]),
    username: new FormControl('',[Validators.required,Validators.maxLength(12),Validators.minLength(5)]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(4)]),
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
