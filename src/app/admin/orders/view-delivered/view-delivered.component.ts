import { Component, OnInit } from '@angular/core';
import{AdminService} from '../../adminservice.service';
import{AdminFoodService} from '../../adminfoodservice.service';
@Component({
  selector: 'app-view-delivered',
  templateUrl: './view-delivered.component.html',
  styleUrls: ['./view-delivered.component.css']
})
export class ViewDeliveredComponent implements OnInit {

  constructor(private admin:AdminService,private adminfood:AdminFoodService) { }

orders:any;
foodItems:any;
noOrders:boolean=false;
  ngOnInit(): void {

  	this.admin.getDelivered().subscribe(data=>{
  		
      this.orders=this.adminfood.setOrderProperty(data);
  		this.foodItems=this.adminfood.getFoodDetail(this.orders);
  		let order=this.adminfood.getOrders();
  		this.adminfood.setOrders(order);
  		console.log(data);
      if(this.orders.length==0)
      {
          this.noOrders=true;
      }
      else
      {
        this.noOrders=false;
      }
  	});
  	

  }

}
