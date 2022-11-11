import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { ProfilemodalService } from 'src/app/service/profilemodal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-newquiz',
  templateUrl: './newquiz.component.html',
  styleUrls: ['./newquiz.component.css']
})



export class NewquizComponent implements OnInit {

  imgSrc!: string;
  checkAnswer!: string;
  statusButton : string =  "1"
  status!: boolean;
  statusPay : boolean = false
  previewLoaded: boolean = false;
  show_alert_del: boolean = true;
  user!:any

  
  productForm: FormGroup = this.fb.group({
    quizName: ['', Validators.required],
    owner: [''],
    img: [''],
    quiz: this.fb.array([
      this.fb.group({
        question: ['', Validators.required],
        choice1: ['', Validators.required],
        choice2: ['', Validators.required],
        choice3: ['', Validators.required],
        choice4: ['', Validators.required],
        answer: ['', Validators.required],
      })
    ])
  });

  get quizName() { return this.productForm.get('quizName') }
  get quiz() { return this.productForm.get('quiz') as FormArray; }

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private router: Router,
    private profile: ProfilemodalService,
  ) { }

  ngOnInit(): void {
    this.user = this.profile.getUser()
    console.log(this.user)
  }

  addQuiz() {
    console.log(!this.statusPay)
    if((this.productForm.value.quiz).length >= 5 && !this.statusPay){
      this.statusButton = "2"
    }else{
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
  }

  pay() {
    Swal.fire({
      title: 'Unlocked Premium',
      text: "Unlocked to add unlimited questions!!!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '0.15 $',
      reverseButtons: true,
    }).then((result) => {
      if(result.isConfirmed == true){
        Swal.fire(
          'Thank you',
          'Your can add unlimited questions!!!',
          'success'
        )
        this.statusButton = "3"
        // this.dataService.setPremium(true)
        this.statusPay = true

      }
    })
  }

  delQuiz(index: number) {
    if (this.show_alert_del) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        input: 'checkbox',
        inputPlaceholder: "Don't ask me again",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        reverseButtons: true
      }).then((result) => {
        console.log(result)
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your question has been deleted.',
            'success'
          )
          this.status = false
          this.quiz.removeAt(index)
        }
        if (result.value == 1) {
          this.show_alert_del = false
        }
        if((this.productForm.value.quiz).length < 5 && result.isConfirmed == true && !this.statusPay){
          this.statusButton = "1"
        }
      })
    }else{
      this.status = false
      this.quiz.removeAt(index)
    }
  }


  onChangeImg(e: any) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      var pattern = /image-*/;
      const reader = new FileReader();
      if (!file.type.match(pattern)) {
        alert('invalid format')
        this.productForm.reset()
      } else {
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.previewLoaded = true;
          this.productForm.patchValue({
            img: reader.result?.toString()
          });
        };

      }
    }
  }

  resetForm() {
    this.productForm.reset();
    this.previewLoaded = false;
  }

  getDateNow() {
    return [new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear()].join('/')
  }

  addData() {
    if (this.productForm.status == "INVALID") {
      this.status = true
    } else {
      this.dataService.addQuiz(
        {
          quizName: this.productForm.value.quizName || '',
          owner: this.user.username,
          datetime: this.getDateNow(),
          count: 0,
          img: this.productForm.value.img || '',
          quiz: this.productForm.value.quiz
        }
      ).subscribe(
        data => {
          console.log(this.dataService.getAllQuiz())
          Swal.fire({
            title: 'Quiz added successfully',
            icon: 'success',
          })
          this.productForm.reset();
          this.router.navigate(['/quiz']);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  getAllQuiz() {
    return this.dataService.getAllQuiz()
  }

}
