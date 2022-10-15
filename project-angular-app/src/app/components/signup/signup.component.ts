import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  // firstName = new FormControl('');
  // lastName = new FormControl('');

  profileForm = new FormGroup({
    title: new FormControl(''),
    firstName:  new FormControl(''),
    lastName: new FormControl(''),
    username: new FormControl('',[Validators.required]),
    sex: new FormControl(''),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required]),
  });
  

  get email() {return this.profileForm.get('email');}

  get stdid() {return this.profileForm.get('stdid');}

  constructor() { }

  ngOnInit(): void {
  }


}
