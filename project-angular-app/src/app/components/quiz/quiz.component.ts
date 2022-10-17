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
  alert_comment : boolean = false
  searchText: string = "";
  type_display!: string;

  productForm = new FormGroup({
    name: new FormControl(''),
    text: new FormControl('', [Validators.required]),
  });

  get text() { return this.productForm.get('text') }

  constructor(
    private dataService: DataService,
    private commentService: CommentService,
    private countService : CountService
  ) { }

  ngOnInit(): void {
  }

  getAlldata() {
    return this.dataService.getAlldata()
  }

  getAllcomment() {
    return this.commentService.getAllcomment().reverse()
  }

  getAllcount(){
    return this.countService.getAllcount()
  }

  addCount(id : number){
    this.dataService.data[id].count += 1
    this.countService.count[0].count += 1
  }

  getCount(){
    return this.countService.getAllcount()
  }
  
  addComment() {
    if(this.text?.errors?.['required']){
      this.alert_comment = true
    }else{
    this.commentService.comment.push(
      {
        name: this.productForm.value.name || 'test',
        text: this.productForm.value.text || '',
      }
    )
    this.alert_comment = false
    alert("Add Comment Success")
    }
  }

  ShowTypeDisplay(){
    return (this.searchText).length > 0 ? "Searching . . ." : "Quiz"
  }

}
