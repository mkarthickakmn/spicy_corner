import { Component, OnInit } from '@angular/core';
import{Food} from '../food/food.module';
import{FoodTimings} from '../food/foodtimings.module';
import{FoodService} from '../foodservice.service';
import{FoodTimingService} from '../foodtimings.service';
import{DataStorageService}from '../data-storage.service'
import{OrderService} from '../orderservice.service'
import{UserService} from '../user.service';
import{Router} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private foodservice:FoodService,private foodTimingService:FoodTimingService,
    private datastorage:DataStorageService,private orderservice:OrderService,private route:Router) { }
 food:any=[];
  message:string="";
  ngOnInit(): void {

    this.datastorage.readyToServe().subscribe(data=>{
      console.log("readyToServe");
      console.log(data);
      if(this.foodservice.getfoodServicesByTimings().length>0)
        this.food=this.foodservice.getfoodServicesByTimings();
      else if(this.foodservice.getFoodType())
      {
        this.message=(this.foodservice.getFoodType().type)+" is not available at the moment.";
      }
      else if(this.food.length==0)
      {
        this.message="Our Service starts at 7 A.M..";
      }
    });

  	 }
  orders()
  {
    this.route.navigate(['/order']);
  }
 
}
