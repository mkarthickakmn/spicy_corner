import{Injectable} from '@angular/core';
import{Subject} from 'rxjs';
@Injectable({providedIn:'root'})
export class AdminFoodService
{
	private food:any;
	private orders:any;
	private orderedItems:any;
	count=new Subject<any>();
	setFood(food)
	{
		this.food=food;
	}
	getFood()
	{
		return this.food.slice();
	}

	getFoodDetail(orders:any)
	{
		let foodlist=[],i=0,name='';
		let food:any=[];
		for(let x in orders)
		{
			food=orders[x].food;
			for(let y in food)
			{
				console.log(food[y]);
				name+=food[y].name+'x'+food[y].order_quantity+','
			}

			foodlist[i]=name.slice(0,name.length-1);
			name=''
			i++;
		
		}
		return foodlist;
	}

	getFoodItems()
	{
		return this.orderedItems;
	}

	setOrders(orders:any)
	{
		this.orders=orders;
		this.count.next(orders);
	}

	getOrders()
	{
		return this.orders;
	}

	getOrder_id(order:any)
	{
		let order_id=[]
		for(let x in order)
		{
			order_id.push(order[x]._id);
		}
		return order_id;
	}

	getImageById(id,img)
	{
		for(let x in this.food)
		{
			if(this.food[x]._id==id)
			{
				this.food[x].image=img;
			}
		}
		this.setFood(this.food);
	}

	setOrderProperty(order:any)
	{
						
		for(let x in order)
		{
			order[x].item='';
			for(let y in order[x].orders)
			{

				order[x].item+=order[x].orders[y].food.name+" x";
				order[x].item+=order[x].orders[y].order_quantity+",";
			}
			order[x].item=order[x].item.substr(0,order[x].item.length-1);
		}
		return order;
	}
}