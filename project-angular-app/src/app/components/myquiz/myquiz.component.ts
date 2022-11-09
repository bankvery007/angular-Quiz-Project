import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { ProfilemodalService } from 'src/app/service/profilemodal.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-myquiz',
  templateUrl: './myquiz.component.html',
  styleUrls: ['./myquiz.component.css']
})
export class MyquizComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private profile: ProfilemodalService,
  ) { }

  quiz!: any
  quizfilter : any = []
  q :any = []
  user!: any 
  show_alert_del: boolean = true
  result!: string
  searchText: string = "";
 

  ngOnInit(): void {
    this.user = this.profile.getUser()
    this.onLoading()
  }

  onLoading() {
    try {
      this.dataService.getAllQuiz().subscribe(
        data => {
          this.quiz = data.reverse();
          this.quizfilter = []
          this.q = []
          for (let i = 0; i < this.quiz.length; i++) { 
            if(this.quiz[i].owner == this.user.username){
              this.quizfilter.push(this.quiz[i])
              this.q.push(i)
            }
          }
        },
        err => {
          console.log(err);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  delQuiz(index: number) {
    this.dataService.delQuiz(this.quiz[this.q[index]]._id).subscribe(
      data => {
        this.result = data
        this.onLoading()
      }
    )

  }

  delQuizAlert(index: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      input: 'text',
      inputLabel: 'Please type ' + this.quiz[this.q[index]].quizName + ' to confirm.',
      inputPlaceholder: this.quiz[this.q[index]].quizName,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm',
      reverseButtons: true,
    }).then((result) => {
      console.log(result)
      if (result.value === this.quiz[this.q[index]].quizName) {
        Swal.fire(
          'Deleted!',
          'Your question has been deleted.',
          'success'
        )
        this.delQuiz(index)
      } else if (result.isConfirmed == true) {
        Swal.fire({
          title: 'Text mismatch!',
          text: 'Please type again.',
          icon: 'question',
          confirmButtonText: 'OK',
        }).then(() => {
          this.delQuizAlert(index)
        })
      }
    })

  }





}
