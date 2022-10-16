import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loginModel } from '../login.model'
import { SigninComponent } from '../components/signin/signin.component';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private signinComponent:SigninComponent) { }

  onClickLogin() {
    //     this.http.post('http://localhost:3000/login/signin').subscribe(data => {
    //     this.id = data.id;
    //     this.name = data.name;
    //  }
    this.http.post('http://localhost:3000/login/signin',
    {"username":this.signinComponent.loginForm.value.username,"password":this.signinComponent.loginForm.value.passowrd})
    .subscribe(data => {
      alert(data)
    })
      
  }
}
