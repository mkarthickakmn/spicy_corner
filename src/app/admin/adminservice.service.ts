import{Injectable,EventEmitter,OnInit} from '@angular/core';
import{BehaviorSubject} from 'rxjs';
// import{FoodTimingService} from './foodtimings.service';
// import{Food} from './food/food.module'
// import{User} from './user/user.module'
// import{Order} from './ordered/order.module';
// import{FoodTimings} from './food/foodtimings.module'
import{HttpClient}from '@angular/common/http';
import{map,tap} from 'rxjs/operators';
import{AdminFoodService} from './adminfoodservice.service'
// import{UserService} from './user.service';
// import{FoodService} from './foodservice.service';
// import{OrderService} from './orderservice.service';
const url="";
@Injectable({providedIn:'root'})
export class AdminService  {
constructor(private http:HttpClient,private adminFood:AdminFoodService){}

  addFood(food:any)
  {
   return this.http
      .post<any>(
        url+'/addfood',
          {
              food:food
          }
        )
  }

  getFood()
  {
    return this.http
      .post<any>(
        url+'/getfood',{}
        ).pipe(
          tap(data=>{
              this.adminFood.setFood(data);
          })
        )
  }

   updateFood(food:any,image_change:any)
  {
   return this.http
      .post<any>(
        url+'/updatefood',
          {
              food:food,
          }
        )
  }

   delFood(food:any)
  {
   return this.http
      .post<any>(
        url+'/delfood',
          {
              food:food
          }
        )
  }

  searchCategory(category:any)
  {
     return this.http
      .post<any>(
        url+'/search_category',
          {
              category:category
          }
        )
  }

  viewOrders()
  {
     return this.http
      .post<any>(
        url+'/view_Orders',{}
        ).pipe(tap(data=>{
          this.adminFood.setOrders(data);
        }))
  }

  setToDelivered(id,user,order_id)
  {
     return this.http
      .post<any>(
        url+'/pay_status',
          {
              id:id,
              user:user,
              order_id:order_id
          }
        )
  }

  getDelivered()
  {
   return this.http
      .post<any>(
        url+'/view_delivered',{}
        ) 
  }

  getUsers()
  {
    return this.http
      .post<any>(
        url+'/getUser',{}
        ) 
  }
  
}

