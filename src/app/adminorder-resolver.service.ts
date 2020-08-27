import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,Router
} from '@angular/router';

import{Order} from './ordered/order.module';
import{UserService} from './user.service'
import{AdminService}from './admin/adminservice.service'
import{OrderService} from './orderservice.service';
import{DataStorageService} from './data-storage.service'
@Injectable({ providedIn: 'root' })
export class AdminOrderResolverService implements Resolve<any> {
  constructor(
   private userservice:UserService,private admin:AdminService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
     return this.admin.viewOrders();
	   
  }
}
