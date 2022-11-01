import { Injectable,ViewChild,ElementRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loginModel } from '../login.model'
import { SigninComponent } from '../components/signin/signin.component';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  @ViewChild('token') nameKey!: ElementRef;

  constructor(private http: HttpClient, private signinComponent:SigninComponent) { }

  onClickLogin() {
    this.http.post('http://localhost:3000/login/signin',
    {"username":this.signinComponent.loginForm.value.username,"password":this.signinComponent.loginForm.value.password})
    .subscribe(data => {
      console.log(data)
      localStorage.setItem("token",this.nameKey.nativeElement.value);
    })
  }
}
