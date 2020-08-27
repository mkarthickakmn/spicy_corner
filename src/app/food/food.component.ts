import { Component, OnInit } from '@angular/core';
import{FoodTimings} from './foodtimings.module'
import {FoodService} from '../foodservice.service'
@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {

  constructor(private foodservice:FoodService) { }
food:any;
  ngOnInit(): void {
  	this.food=this.foodservice.getfoodServicesByTimings();
  }

}
