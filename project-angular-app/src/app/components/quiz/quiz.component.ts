import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CommentService } from 'src/app/service/comment.service';
import { DataService } from 'src/app/service/data.service';
import { GroupService } from 'src/app/service/group.service';



@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  imgSrc: string = 'https://cdn.discordapp.com/attachments/1026870373700083732/1029786860471464026/Group_26.png'
  alert_comment : boolean = false
  gametype_list: string[] = ['ปริศนาฟ้าแลบ ดั้งเดิม','คณิตคิดเร็ว','Custom Game'];
  searchText!: string;

  productForm = new FormGroup({
    name: new FormControl(''),
    text: new FormControl('', [Validators.required]),
  });

  get text() { return this.productForm.get('text') }

  constructor(
    private dataService: DataService,
    private commentService: CommentService,
    private groupService : GroupService
  ) { }

  ngOnInit(): void {
  }

  getAlldata() {
    return this.dataService.getAlldata()
  }

  getAllcomment() {
    return this.commentService.getAllcomment().reverse()
  }

  getAllgroup(){
    return this.groupService.getAllgroup()
  }

  getIDgroup(g_id:number){
    return this.groupService.getIDgroup(g_id)
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




}
