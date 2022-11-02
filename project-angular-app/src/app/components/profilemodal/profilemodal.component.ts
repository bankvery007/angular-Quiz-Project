import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profilemodal',
  templateUrl: './profilemodal.component.html',
  styleUrls: ['./profilemodal.component.css']
})
export class ProfilemodalComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  onClickLogout(){
    window.localStorage.setItem("token", "");
    this.router.navigate(['./signin']);
  }
}
