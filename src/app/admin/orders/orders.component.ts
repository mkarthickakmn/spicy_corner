import { Component, OnInit } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import{AdminService} from '../adminservice.service';
import {PushNotificationService} from '../../PushNotification.service';
import{AdminFoodService} from '../adminfoodservice.service';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private admin:AdminService,private adminfood:AdminFoodService,private pushService:PushNotificationService) { }
  count:number=0;
  foodItems:any;
  ngOnInit(): void {
    document.getElementById('add').click();
  	this.admin.viewOrders().subscribe();
    this.adminfood.count.subscribe(data=>this.count=data.length);
    this.pushService.getNotification().subscribe();

  }


}
