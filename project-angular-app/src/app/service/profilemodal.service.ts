import { Injectable, ViewChild, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfilemodalService {

  @ViewChild('token') nameKey!: ElementRef;

  constructor() { }

  user!: any
  token!: string

  setUser(user: any) {
    this.user = user
  }

  getUser() {
    return this.user
  }




}
