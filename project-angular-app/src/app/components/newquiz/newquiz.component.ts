import { NgIfContext } from '@angular/common';
import { NodeWithI18n } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormBuilder } from '@angular/forms';
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
  status! : boolean; 

  // productForm = new FormGroup({
  //   quizName: new FormControl('', [Validators.required]),
  //   datetime: new FormControl('', [Validators.required]),
  //   quiz: new FormArray([
  //     new FormGroup({
  //       question: new FormControl('', [Validators.required]),
  //       number: new FormControl('', [Validators.required]),
  //       choice1: new FormControl('', [Validators.required]),
  //       choice2: new FormControl('', [Validators.required]),
  //       choice3: new FormControl(''),
  //       choice4: new FormControl(''),
  //       answer: new FormControl('', [Validators.required]),
  //       pic: new FormControl('', [Validators.required])
  //     })
  //   ])
  // });

  productForm: FormGroup = this.fb.group({
    quizName: ['', Validators.required],
    quiz: this.fb.array([
      this.fb.group({
        question: ['', Validators.required],
        choice1: ['', Validators.required],
        choice2: ['', Validators.required],
        choice3: ['', [Validators.required]],
        choice4: ['', [Validators.required]],
        answer: ['', Validators.required],
      })
    ])
  });

  get quizName() { return this.productForm.get('quizName') }
  get quiz() { return this.productForm.get('quiz') as FormArray; }


  constructor(
    private dataService: DataService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  addQuiz() {
    this.status = false
    this.quiz.push(
      new FormGroup({
        question: new FormControl('', [Validators.required]),
        choice1: new FormControl('', [Validators.required]),
        choice2: new FormControl('', [Validators.required]),
        choice3: new FormControl('', [Validators.required]),
        choice4: new FormControl('', [Validators.required]),
        answer: new FormControl('', [Validators.required]),
      }));
  }

  delQuiz(index: number) {
    this.status = false
    this.quiz.removeAt(index)
  }

  onChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      const render = new FileReader();
      render.onload = (e: any) => {
        return e.target.result;
      };
      return render.readAsDataURL(event.target.files[0])
    }
  }

  // setValidators() {
  //   this.productForm.get('choice3')?.setValidators(Validators.required)
  //   this.productForm.get('choice4')?.setValidators(Validators.required)
  // }

  ngClassMethod1() { if (this.checkAnswer == "1") { return true } else { return false } }
  ngClassMethod2() { if (this.checkAnswer == "2") { return true } else { return false } }
  ngClassMethod3() { if (this.checkAnswer == "3") { return true } else { return false } }
  ngClassMethod4() { if (this.checkAnswer == "4") { return true } else { return false } }


  getDateNow() {
    return [new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear()].join('/')
  }

  addData() {
    if(this.productForm.status == "INVALID"){
      this.status = true
    }else{
      this.dataService.data.push(
        {
          quizName: this.productForm.value.quizName || '',
          datetime: this.getDateNow(),
          count: 0,
          quiz: this.productForm.value.quiz
        }
      )
      console.log(this.dataService.getAlldata())
      alert("Add Data Success")
    }
  }

  getAlldata() {
    return this.dataService.getAlldata()
  }

}
