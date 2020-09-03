import { Component, OnInit } from '@angular/core';
import{Food} from '../food/food.module';
import{FoodService} from '../foodservice.service';
import{Router,ActivatedRoute,Params}from '@angular/router'
import {DataStorageService} from '../data-storage.service';
@Component({
  selector: 'app-ordered',
  templateUrl: './ordered.component.html',
  styleUrls: ['./ordered.component.css']
})
export class OrderedComponent implements OnInit {

  constructor(private foodservice:FoodService,private dataStorage:DataStorageService,
    private router:Router,private route:ActivatedRoute) { }
  foodOrder:Food;
  id:number;
  ngOnInit(): void {
  		// this.route.params.
  		// subscribe((params:Params)=>{
  		// 	this.id=+params['id'];
  		// 	console.log(this.id);
  		// 	this.foodOrder=this.foodservice.getFoodItemsById(this.id);
  		// });

  		// console.log(this.foodOrder);
  }
 

}
