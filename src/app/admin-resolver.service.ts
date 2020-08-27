import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,Router
} from '@angular/router';

import{Order} from './ordered/order.module';
import{UserService} from './user.service'
import{OrderService} from './orderservice.service';
import{DataStorageService} from './data-storage.service'
@Injectable({ providedIn: 'root' })
export class AdminResolverService implements Resolve<void> {
  constructor(
   private userservice:UserService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
       this.userservice.isAdmin.next();
	   
  }
}
