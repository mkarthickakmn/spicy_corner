import{Injectable,EventEmitter} from '@angular/core';
import{BehaviorSubject,Subject} from 'rxjs';
import{Order} from './ordered/order.module';
import{FoodService} from './foodservice.service';
import{FoodTimingService} from './foodtimings.service'; 
import{Food} from './food/food.module';
import{HttpClient,HttpEventType,HttpErrorResponse} from '@angular/common/http';
@Injectable({providedIn:'root'})
export class OrderService
{
	constructor(private foodservice:FoodService,private ft:FoodTimingService,private http:HttpClient){}
	food:Food[]=this.foodservice.getFoodItems();
	private order:Order[]=[
		// new Order(200,new Food(102,"","vegnoodles","nice",70,1,this.ft.getTimings()[2]),4,"Ordered Items"),
		// new Order(201,new Food(103,"","noodles","nice",70,1,this.ft.getTimings()[2]),3,"CartOrders")
		// new Order(503,this.food[4],3,"New Orders")
	];


  orderType=new BehaviorSubject<string>(null);
  orderCount=new BehaviorSubject<void>(null)
  dataChanged=new Subject<void>();
  notification=new Subject<void>();
  price:number;
  setOrders(order:Order[])
  {
    console.log(this.order);
    this.order=order;
    this.orderCount.next();
    // this.dataChanged.next();
  }
	getOrder()
	{
		let foodOrder:Order[]=[];
		
			for(let x in this.order)
	        {
	            if(this.order[x].order_status=="New Orders")
	            {
	                foodOrder.push({...this.order[x]}); 
	            }
	        }
		return foodOrder;
	}

	getOrderById(id:number)
	{
		let foodOrder:Order[]=[];
		
			for(let x in this.order)
	        {
	            if(this.order[x]._id==id)
	            {
	                foodOrder.push({...this.order[x]}); 
	            }
	        }
		return foodOrder;
	}

    updateOrder(id:number,order:Order)
    {
        for(let x in this.order)
            {
                if(this.order[x]._id==id)
                {
                    this.order[x].order_quantity=order.order_quantity;
                }
            }
    }

	getFoodItemsById(id:string)
    {

        let foodOrder:Order[]=[];
        for(let x in this.order)
        {
            if(this.order[x].food._id==id)
            {
                 return [this.order[x]];
            }
        }
    }


    setNewOrder(order:Order[])
    { 
     this.order=order;
    }
    setCartOrder(order:Order[])
    {
    	this.order.push(...order);	
    }
    cancelOrder()
    {

    	this.order.splice(this.order.length-1,1);
    	setTimeout(()=>{
    		this.orderType.next("New Orders");

    	},1000);
    	
    }



    getTotal(menu:string,order:Order[])
    {
    	var total:number=0;
    	for(let x in order)
    	{
    		if(order[x].order_status==menu)
	            {
	   				total+=(order[x].order_quantity*order[x].food.amount);
	                
	            }
    	}

        return total;
    }


    countOrders()
    {

      let orderMenu=["New Orders","CartOrders","Ordered Items","delivered"];
        let count:number[]=[],c:number=0,i=0;
        for(let x in orderMenu)
        {
            for(let y in this.order)
            {

             if(this.order[y].order_status==orderMenu[x])
                {

                    c++;
                   
                }
            }
            if(i==3)
            {
                count[i-1]=c;    
            }
            else if(i<=2)
            {
                count[i]=c;
                i++;      
            }
            if(i<=2)
                c=0;
            
           
        }
        return count;
    }

  
}