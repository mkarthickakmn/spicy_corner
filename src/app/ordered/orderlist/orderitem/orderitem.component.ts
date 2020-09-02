import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {Food} from '../../../food/food.module';
import {Order} from '../../order.module';
import * as moment from 'moment';
@Component({
  selector: 'app-orderitem',
  templateUrl: './orderitem.component.html',
  styleUrls: ['./orderitem.component.css']
})
export class OrderitemComponent implements OnInit {

  constructor() { }
@Input()order:any;
	isDelivered:boolean=false;
  ngOnInit(): void {
    console.log(this.order);
    this.order.time=moment(this.order.updatedAt).format('LLL');
  	if(this.order.order_status=='delivered')
  	{
  		this.isDelivered=true;
  	}
  	else
  	{
  		this.isDelivered=false;
  	}
  }
}
