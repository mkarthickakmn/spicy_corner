import { Component, OnInit } from '@angular/core';
import{Food} from '../food.module';
import{FoodService} from '../../foodservice.service';
import { FilterPipe } from '../../filter.pipe'
import{Injectable} from '@angular/core';
import{OrderService} from '../../orderservice.service'
@Component({
  selector: 'app-foodlist',
  templateUrl: './foodlist.component.html',
  styleUrls: ['./foodlist.component.css']
})

export class FoodlistComponent implements OnInit {

 
  constructor(private foodservice:FoodService,private orderservice:OrderService,private filter:FilterPipe) { }

  food:Food[]=[];
  search:string="";
  timing_message:string="";
  message:string="";
  type:string="";
  ngOnInit(): void {
    this.orderservice.orderType.next(null);
  if(this.foodservice.getfoodServicesByTimings().length>0)
     {
        this.food=this.foodservice.getfoodServicesByTimings();
        this.message=this.food[0].timings.description;
        this.timing_message=this.message;
        this.type=this.food[0].timings.type;
      }
      else
      {
         this.timing_message="No food available at the moment...";
      }
      // else
      // {
      //   this.food=this.foodservice.getfoodServicesByType("breakfast");
      // }
     
        this.foodservice.foodByType.
        subscribe(
            (type:string)=>{
              this.food=this.foodservice.getfoodServicesByType(type);
              if(this.food.length==0)
              {

               this.timing_message="No food available at the moment...";
              }
              else
              {
                if(this.type!=type)
                {
                   this.timing_message="";
                }
                else
                {
                    this.timing_message=this.message;
                }
  
              }
              
            }
          );
     
     
   }

  
  searchFood()
  {
        // this.food=this.foodservice.getFoodItems();
    // console.log(this.food)
  }

}
