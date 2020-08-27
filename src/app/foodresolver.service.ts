import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import{Food} from './food/food.module';
import{FoodService} from './foodservice.service'
import{DataStorageService} from './data-storage.service'
@Injectable({ providedIn: 'root' })
export class FoodResolverService implements Resolve<Food[]> {
  constructor(
    private foodservice:FoodService,private data:DataStorageService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    return this.data.readyToServe();
  }
}
