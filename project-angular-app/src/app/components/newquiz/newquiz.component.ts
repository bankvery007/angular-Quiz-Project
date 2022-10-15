import { NgIfContext } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';


@Component({
  selector: 'app-newquiz',
  templateUrl: './newquiz.component.html',
  styleUrls: ['./newquiz.component.css']
})



export class NewquizComponent implements OnInit {

  imgSrc!: string;
  checkAnswer!: string;
  checkNumber: string = "4";
  show: boolean = true;
  choice3_dimmy!: string;
  choice4_dimmy!: string;
  array = Array(false, false, false, false, false);

  productForm = new FormGroup({
    question: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required]),
    choice1: new FormControl('', [Validators.required]),
    choice2: new FormControl('', [Validators.required]),
    choice3: new FormControl(''),
    choice4: new FormControl(''),
    answer: new FormControl('', [Validators.required]),
  });

  get question() { return this.productForm.get('question') }
  get number() { return this.productForm.get('number') }
  get choice1() { return this.productForm.get('choice1') }
  get choice2() { return this.productForm.get('choice2') }
  get choice3() { return this.productForm.get('choice3') }
  get choice4() { return this.productForm.get('choice4') }
  get answer() { return this.productForm.get('answer') }

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.ngClassNumber4()
  }

  onChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      const render = new FileReader();
      render.onload = (e: any) => {
        this.imgSrc = e.target.result;
      };
      render.readAsDataURL(event.target.files[0])
    }
  }
  
  onClick() {
    this.show = !this.show
  }
  
  ngClassMethod1() { if (this.checkAnswer == "1") { return true } else { return false } }
  ngClassMethod2() { if (this.checkAnswer == "2") { return true } else { return false } }
  ngClassMethod3() { if (this.checkAnswer == "3") { return true } else { return false } }
  ngClassMethod4() { if (this.checkAnswer == "4") { return true } else { return false } }

  ngClassNumber2() {
    this.show = false
    this.choice3_dimmy = this.productForm.value.choice3 || ''
    this.choice4_dimmy = this.productForm.value.choice4 || ''
    this.productForm.controls['choice3'].reset()
    this.productForm.controls['choice4'].reset()
    this.productForm.get('choice3')?.clearValidators();
    this.productForm.get('choice4')?.clearValidators();
    this.array[3] = false
    this.array[4] = false
    if (this.checkAnswer == "3" || this.checkAnswer == "4") {
      this.checkAnswer = ""
    }
  }

  ngClassNumber4() {
    this.show = true
    this.productForm.controls['choice3'].setValue(this.choice3_dimmy);
    this.productForm.controls['choice4'].setValue(this.choice4_dimmy);
    this.productForm.get('choice3')?.setValidators(Validators.required)
    this.productForm.get('choice4')?.setValidators(Validators.required)
  }

  addData() {
    if (this.question?.errors?.['required']) {this.array[0] = true } else {this.array[0] = false}
    if (this.choice1?.errors?.['required']) {this.array[1] = true} else {this.array[1] = false}
    if (this.choice2?.errors?.['required']) {this.array[2] = true} else {this.array[2] = false}
    if (this.checkNumber == "4") {
      if (this.choice3?.errors?.['required']) {this.array[3] = true} else {this.array[3] = false}
      if (this.choice4?.errors?.['required']) {this.array[4] = true} else {this.array[4] = false}
    }
    if (this.answer?.errors?.['required']) {this.array[5] = true} else {this.array[5] = false}
    if (this.array.every(v => v == false)) {
      this.dataService.data.push(
        {
          question: this.productForm.value.question || '',
          number: parseInt(this.productForm.value.number || ''),
          choice1: this.productForm.value.choice1 || '',
          choice2: this.productForm.value.choice2 || '',
          choice3: this.productForm.value.choice3 || '',
          choice4: this.productForm.value.choice4 || '',
          answer: parseInt(this.productForm.value.answer || ''),
          picture: this.imgSrc || "https://cdn.discordapp.com/attachments/1026870373700083732/1029786860471464026/Group_26.png"
        }
      )
      alert("Add Data Success")
    }
  }

  getAlldata() {
    return this.dataService.getAlldata()
  }

  clsData() {
    this.productForm.reset()
    this.productForm.controls['number'].setValue("4");
    this.show = true
    this.imgSrc = ""
  }
}
