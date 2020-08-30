import { Component,Input, OnInit,Output,EventEmitter,OnDestroy} from '@angular/core';
import{Food} from '../../food/food.module';
import{Order} from '../order.module';
import{FoodService} from '../../foodservice.service';
import{OrderService} from '../../orderservice.service';
import{Router,ActivatedRoute,Params}from '@angular/router';
import{DataStorageService}from '../../data-storage.service'
import{Subscription} from 'rxjs';
@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit,OnDestroy {

  constructor(private foodservice:FoodService,private orderservice:OrderService,
    private router:Router,private route:ActivatedRoute,private dataStorage:DataStorageService) { }
  foodOrder:Order[];
  id:number;
  total:number=null;
  subscription:Subscription;
  noOrders:boolean=true;
  menu:string;
  ngOnInit(): void 
  {
      
  		this.route.queryParams.
  		subscribe((params:Params)=>{
        if(params.back)
        {
            this.orderservice.orderType.next(params.back);
        }
  			
  		});


      this.subscription=this.orderservice.orderType.subscribe(

        (menu:string)=>{
          this.menu=menu;
          if(!menu)
          {
            
            this.dataStorage.getOrderByType("New Orders").subscribe(data=>
              {this.foodOrder=data
                  if(this.foodOrder.length>0)
                   {
                      this.total=this.orderservice.getTotal("New Orders",this.foodOrder);
                      this.noOrders=false;
                   }
                   else
                   {
                     this.noOrders=true;
                   }
               });
             
                     
          }
          else
          {
            
            this.dataStorage.getOrderByType(menu).subscribe(
              data=>
                {
                  this.foodOrder=data;
                  if(data.length==0)
                  {
                    this.noOrders=true;
                  }
                  else
                  {

                    this.noOrders=false;
                    if((menu=="New Orders"||menu=="CartOrders")&&this.foodOrder.length>0)
                     {
                       this.total=this.orderservice.getTotal(menu,this.foodOrder);
                       
                     }
                     else
                     {
                       this.total=null;
                       this.noOrders=true;
                     }
                  }
                   
                 }
              );
  
          }
        
        });
       

  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }


}
