import { Injectable,ViewChild,ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfilemodalService {

  @ViewChild('token') nameKey!: ElementRef;

  constructor(private http: HttpClient) { }

  user!:any
  token!: string

  setUser(user:any){
    this.user = user
  }

  getUser(){
    return this.user
  }

}
