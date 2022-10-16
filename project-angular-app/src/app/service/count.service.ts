import { Injectable } from '@angular/core';
import { countModel } from '../count.model';

@Injectable({
  providedIn: 'root'
})
export class CountService {

  count : countModel = [
    {count: 0},
  ]

  constructor() { }

  getAllcount(){
    return this.count;
  }
}
