import { Component, OnInit } from '@angular/core';
import{FoodTimings} from './foodtimings.module'
import {FoodService} from '../foodservice.service'
import {DataStorageService} from '../data-storage.service';
@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {

  constructor(private foodservice:FoodService,private dataStorage:DataStorageService) { }
food:any;
  ngOnInit(): void {
   	this.food=this.foodservice.getfoodServicesByTimings();

  }

}
