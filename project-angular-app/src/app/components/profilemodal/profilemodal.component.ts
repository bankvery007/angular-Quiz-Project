import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ProfilemodalService } from 'src/app/service/profilemodal.service';
import { HistoryService } from 'src/app/service/history.service';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LoginService } from 'src/app/service/login.service';
import Swal from 'sweetalert2';

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
    private history: HistoryService,
    private http: HttpClient,
    private login: LoginService
  ) { }

  user!: any

  count: any = this.getCountPlayHistory();

  currentProfile: any = this.getUser();

  show: boolean = false;

  profileForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    lastName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    sex: new FormControl('', [Validators.required, Validators.maxLength(6)]),
    birthyear: new FormControl('', [Validators.required, Validators.pattern('[0-9]{4}'), Validators.max(2021), Validators.min(1900)]),
    phonenumber: new FormControl('', [Validators.required, Validators.pattern('[0][0-9]{9}')]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  ngOnInit(): void {
  }

  onClickLogout() {
    window.localStorage.setItem("token", "");
    this.appComponent.haveToken()
    this.router.navigate(['./signin']);
  }

  setUser(user: any) {
    return this.profilemodal.setUser(user);
  }

  getUser() {
    return this.profilemodal.getUser();
  }

  getCountPlayHistory() {
    return this.history.getCountPlayHistory();
  }

  onClickEdit() {
    this.show = !this.show;
  }

  onClickDelete() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      input: 'password',
      inputLabel: 'Please type your password to confirm.',
      inputPlaceholder: 'Your password',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm',
      reverseButtons: true,
    }).then((result) => {
      console.log(result)
      if (result.value) {
        this.http.delete<any>('http://localhost:3000/login/delete/' + this.currentProfile.username + " " + result.value, { headers: this.login.getToken() })
          .subscribe({
            next: (data) => {
              console.log("data", data)
              if (data) {
                Swal.fire(
                  'Deleted!',
                  'Your profile has been deleted.',
                  'success'
                )
                this.router.navigate(['/home']);
              } else {
                Swal.fire({
                  title: 'Text mismatch!',
                  text: 'Please type again.',
                  icon: 'question',
                  confirmButtonText: 'OK',
                }).then(() => {
                  this.onClickDelete()
                })
              }
            },
            error: (error) => {
              Swal.fire({
                title: 'Error!',
                text: error,
                icon: 'question',
                confirmButtonText: 'OK',
              })
            }
          })
      } else if (result.isConfirmed == true) {
        Swal.fire({
          title: 'Text mismatch!',
          text: 'Please type again.',
          icon: 'question',
          confirmButtonText: 'OK',
        }).then(() => {
          this.onClickDelete()
        })
      }
    })
  }

  onClickUpdate() {
    const patchjson: JSON = <JSON><any>{
      picture: this.currentProfile.picture || '',
      title: this.currentProfile.title || '',
      name: this.profileForm.value.firstName + ' ' + this.profileForm.value.lastName || '',
      sex: this.profileForm.value.sex || '',
      username: this.currentProfile.username || '',
      birthyear: parseInt(this.profileForm.value.birthyear || ''),
      phonenumber: parseInt(this.profileForm.value.phonenumber || ''),
      email: this.profileForm.value.email || '',
      password: this.currentProfile.password
    }

    console.log(this.currentProfile);

    this.http.patch('http://localhost:3000/user/patch/' + this.currentProfile.id, patchjson, { headers: this.login.getToken() }
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
