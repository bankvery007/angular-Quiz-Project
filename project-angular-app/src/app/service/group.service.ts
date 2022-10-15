import { Injectable } from '@angular/core';
import { groupModel } from '../group.model';
@Injectable({
  providedIn: 'root'
})
export class GroupService {

  group : groupModel = [
    {type:"ปริศนาฟ้าแลบ ดั้งเดิม", name:"ปริศนาฟ้าแลบ 1", date:"10/15/2022", player:2},
    {type:"ปริศนาฟ้าแลบ ดั้งเดิม", name:"ปริศนาฟ้าแลบ 2", date:"10/15/2022", player:2},
    {type:"คณิตคิดเร็ว", name:"คณิตคิดในใจ (ประถม)", date:"10/15/2022", player:2},
    {type:"คณิตคิดเร็ว", name:"โจทย์ฟาโรห์ เทลรันเนอร์", date:"10/15/2022", player:3},
    {type:"คณิตคิดเร็ว", name:"เลขมหา(ปะ)ลัย", date:"10/15/2022", player:4},
    {type:"Custom Game", name:"Custom Game1", date:"10/15/2022", player:2},
    {type:"Custom Game", name:"Custom Game2", date:"10/15/2022", player:2},
    {type:"Custom Game", name:"Custom Game3", date:"10/15/2022", player:2},
    {type:"Custom Game", name:"Custom Game4", date:"10/15/2022", player:2},
    {type:"Custom Game", name:"Custom Game5", date:"10/15/2022", player:2},
    {type:"Custom Game", name:"Custom Game6", date:"10/15/2022", player:2},
    {type:"Custom Game", name:"Custom Game7", date:"10/15/2022", player:2},
    {type:"Custom Game", name:"Custom Game8", date:"10/15/2022", player:2},
    {type:"Custom Game", name:"Custom Game9", date:"10/15/2022", player:2},
    {type:"Custom Game", name:"Custom Game10", date:"10/15/2022", player:2},
    {type:"Custom Game", name:"Custom Game11", date:"10/15/2022", player:2},


  ]

  constructor() { }

  getAllgroup(){
    return this.group;
  }

  getIDgroup(g_id : number){
    return this.group[g_id]
  }
}
