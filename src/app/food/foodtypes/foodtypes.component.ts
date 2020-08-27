import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';
import{FoodTimingService} from '../../foodtimings.service'
import{FoodTimings} from '../foodtimings.module'
import {FoodService} from '../../foodservice.service'
@Component({
  selector: 'app-foodtypes',
  templateUrl: './foodtypes.component.html',
  styleUrls: ['./foodtypes.component.css']
})
export class FoodtypesComponent implements OnInit {

  constructor(private foodtimingservice:FoodTimingService,private foodservice:FoodService) { }
  click:boolean=false;
  no:number=0;
  count:number[]=[];
  type:FoodTimings[];
  time:number;
  food:any;
  ngOnInit(): void 
  {
    this.count=this.foodservice.countFoodByType();
    this.time=(new Date().getHours()+(new Date().getMinutes()/60));
    this.type=this.foodtimingservice.getTimings();
    // this.food=this.foodservice.getfoodServicesByTimings(); 
  }
  
  foodType(type:string,i:number)
  {
    this.click=true;
    this.no=i;
    this.foodservice.foodByType.emit(type);
  }

  
 
  
}
