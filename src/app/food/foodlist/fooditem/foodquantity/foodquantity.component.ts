import { Component, OnInit,Input } from '@angular/core';
import{ActivatedRoute,Params,Router} from '@angular/router';
import{FoodService} from "../../../../foodservice.service";
import{OrderService} from "../../../../orderservice.service";
import{FoodTimingService} from "../../../../foodtimings.service";
import {Food} from "../../../food.module";
import {Order} from "../../../../ordered/order.module";
import{DataStorageService}from '../../../../data-storage.service'
@Component({
  selector: 'app-foodquantity',
  templateUrl: './foodquantity.component.html',
  styleUrls: ['./foodquantity.component.css']
})
export class FoodquantityComponent implements OnInit {

  constructor(private route:ActivatedRoute,private router:Router,
    private foodservice:FoodService,private orderservice:OrderService,private ft:FoodTimingService,
    private datastorage:DataStorageService) { }
	message:string="food";
	id:number;
  foodavailable:boolean=true;
  quantity:number=1;
  food:Food;
  product:number;
   num:number=205;
  ngOnInit(): void {
  	this.route.params.
  	subscribe((params:Params)=>{
      this.id=params['id'];
  		this.food=this.foodservice.getFoodItemsById(this.id.toString())[0];
       this.product=this.food.amount;
       this.quantity=1;
       this.foodavailable=true;

  	});
    
  }
  increment()
  {
    if(this.food.quantity<=this.quantity)
    {
      this.foodavailable=false;
    }
    else
    {
     this.quantity++;
     this.foodavailable=true;

    }
     
     this.product=this.quantity*this.food.amount;
 
  }
  decrement()
  {
    if(this.quantity>1)
    {
      this.quantity--
    this.product=this.product-(this.food.amount);
    }
    
  }
  submit()
  {
    let order_id;
     this.datastorage.setNewOrder(this.food,this.quantity,"New Orders").subscribe(
        responseData=>{
          order_id=responseData[0]._id;
          console.log(responseData[0]);
          this.router.navigate(['/order',order_id]);
        }
      );
  	
  }

  addToCart()
  {
      this.datastorage.setCartOrder(this.food,this.quantity,"CartOrders").subscribe();
  }

}
