import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,Router
} from '@angular/router';

import{Order} from './ordered/order.module';
import{FoodService} from './foodservice.service'
import{OrderService} from './orderservice.service';
import{DataStorageService} from './data-storage.service'
@Injectable({ providedIn: 'root' })
export class OrderResolverService implements Resolve<Order[]> {
  constructor(
    private foodservice:FoodService,private data:DataStorageService,private router:Router,
    private orderservice:OrderService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
	  // this.orderservice.orderType.next(null);
   //  this.orderservice.dataChanged.next();
    return this.data.getOrders();
  }
}
