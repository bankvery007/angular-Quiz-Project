import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CommentService } from 'src/app/service/comment.service';
import { CountService } from 'src/app/service/count.service';
import { DataService } from 'src/app/service/data.service';



@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  imgSrc: string = 'https://cdn.discordapp.com/attachments/1026870373700083732/1029786860471464026/Group_26.png'
  alert_comment: boolean = false
  searchText: string = "";
  quiz: any;
  comment: any;


  productForm = new FormGroup({
    comment: new FormControl('', [Validators.required]),
  });

  get text() { return this.productForm.get('comment') }

  constructor(
    private dataService: DataService,
    private commentService: CommentService,
    private countService: CountService
  ) {
    this.onLoading();
  }

  ngOnInit(): void {
  }

  onLoading() {
    try {
      this.dataService.getAllQuiz().subscribe(
        data => {
          this.quiz = data.reverse();
        },
        err => {
          console.log(err);
        }
      );
      this.commentService.getAllcomment().subscribe(
        data => {
          this.comment = data.reverse();
        },
        err => {
          console.log(err);
        }
      );

    } catch (err) {
      console.log(err);
    }
  }

  addComment() {
    if(this.comment?.errors?.['required'] || this.productForm.value.comment == ""){
      this.alert_comment = true
    }else{
      this.commentService.addComment(this.productForm.value).subscribe(
        data => {
          alert('Comment added successfully');
          this.productForm.reset();
          this.onLoading();
          this.alert_comment = false
        },
        err => {
          console.log(err);
        }
      );
      
    }
  }


  getAllcount() {
    return this.countService.getAllcount()
  }

  addCount(id: number) {
    // this.dataService.data[id].count += 1
    this.countService.count[0].count += 1
  }

  getCount() {
    return this.countService.getAllcount()
  }

  ShowTypeDisplay() {
    return (this.searchText).length > 0 ? "Searching . . ." : "Quiz"
  }

}
