import { Component, OnInit } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import{AdminService} from '../../adminservice.service';
import{AdminFoodService} from '../../adminfoodservice.service';
@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {

  constructor(private admin:AdminService,private adminfood:AdminFoodService) { }
  orders:any
  foodItems:any;
  noOrders:boolean=false;
  ngOnInit(): void {

  	this.orders=this.adminfood.getOrders();
    this.orders=this.adminfood.setOrderProperty(this.orders);
    console.log(this.orders);
  	this.foodItems=this.adminfood.getFoodDetail(this.orders);
    if(this.orders.length==0)
    {
        this.noOrders=true;
    }
    else
    {
      this.noOrders=false;
    }
  }

  setToDeliver(id,user,order)
  {
    
    let order_id=this.adminfood.getOrder_id(order);
  	this.admin.setToDelivered(id,user,order_id).subscribe(data=>{
  		alert('Order delivered sucessfully!!!');

  		this.admin.viewOrders().subscribe(
  			data=>{
  				this.orders=this.adminfood.setOrderProperty(data);
  				this.foodItems=this.adminfood.getFoodDetail(this.orders);
          if(this.orders.length==0)
            {
                this.noOrders=true;
            }
            else
            {
              this.noOrders=false;
            }
  			}
		);
  	});
  }


}

