import { Component, OnInit,Input } from '@angular/core';
import{ActivatedRoute,Params,Router} from '@angular/router';
import{FoodService} from "../../../../foodservice.service";
import{OrderService} from "../../../../orderservice.service";
import{FoodTimingService} from "../../../../foodtimings.service";
import {Food} from "../../../../food/food.module"
import{Order} from '../../../order.module'
import{DataStorageService}from '../../../../data-storage.service';
@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {

  constructor(private route:ActivatedRoute,private router:Router,
    private foodservice:FoodService,private orderservice:OrderService,private ft:FoodTimingService
    ,private datastorage:DataStorageService) { }
	message:string="food";
	id:number;
  cart:boolean=false;
  foodavailable:boolean=true;
  quantity:number=1;
  order:Order;
  product:number;
  hideButton:boolean=false;
  ngOnInit(): void {
    
  	this.route.params.
  	subscribe((params:Params)=>{
      this.id=params['id'];
      console.log(this.id);
  		this.order=this.orderservice.getOrderById(this.id)[0];
      if(this.order.order_status=="Ordered Items")
      {
        this.hideButton=true;
      }
       if(this.order.order_status=="delivered")
      {
        this.hideButton=true;
      }
      if(this.order.order_status=="CartOrders")
      {
        this.cart=true;
      }
      else
      {
        this.cart=false;
      }
      
        this.quantity=this.order.order_quantity;
       this.product=this.order.order_quantity*this.order.food.amount;
     
  	});
    
  }
  increment()
  {
    if(this.order.food.quantity<=this.quantity)
    {
      this.foodavailable=false;
      alert("only "+this.quantity+" items are available");
    }
    else
    {
     this.quantity++;
 
    }
     this.product=this.quantity*this.order.food.amount;
 
  }
  decrement()
  {
    if(this.quantity>1)
    {
      this.quantity--
    this.product=this.product-(this.order.food.amount);
    }
    
  }
  submit()
  {
    this.datastorage.updateOrder(this.quantity,this.id).subscribe(data=>{
    });
    this.router.navigate(['/order'],{queryParams:{back:this.order.order_status}});
  }

  moveToCart()
  {

    this.datastorage.moveOrders(this.id).subscribe(data=>{
    this.datastorage.getOrders().subscribe();
    this.router.navigate(['/order'],{queryParams:{back:this.order.order_status}})
    });

  }

   del()
    {
        this.datastorage.delete(this.id).subscribe(data=>{
           this.datastorage.getOrders().subscribe();
            this.router.navigate(['/order'],{queryParams:{back:this.order.order_status}})
        });
    }

  close()
  {
    this.router.navigate(['/order'],{queryParams:{back:this.order.order_status}});
  }
}
