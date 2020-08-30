import{Injectable,EventEmitter,OnInit} from '@angular/core';
import{BehaviorSubject} from 'rxjs';
import{FoodTimingService} from './foodtimings.service';
import{Food} from './food/food.module'
import{User} from './user/user.module'
import{Order} from './ordered/order.module';
import{FoodTimings} from './food/foodtimings.module'
import{HttpClient}from '@angular/common/http';
import{map,tap,catchError} from 'rxjs/operators';
import{UserService} from './user.service';
import{FoodService} from './foodservice.service';
import{OrderService} from './orderservice.service';
const url="";
@Injectable({providedIn:'root'})
export class DataStorageService  {
constructor(private http:HttpClient,private food:FoodService,private order:OrderService,private user:UserService){}

  readyToServe()
  {
   return this.http
      .post<Food[]>(
        url+'/food',{}
        ).pipe(tap(data=>{
          this.food.setFood(data);
        }))
  }

  setNewOrder(food:Food,q:number,menu:string)
  {
    console.log(this.order.getOrder().length);
      if(this.order.getOrder().length==0)
      {
         return this.http
            .post<Order[]>(
              url+'/insertNewOrders',
              {id:food._id,
               quantity:q,
               status:menu,
               user_id:this.user.getUserId()

              }
            ).pipe(tap(responseData=>{
              console.log(responseData);
              this.order.setNewOrder(responseData);
            }))
      }
      else
      {
         return this.http
            .post<Order[]>(
              url+'/updateNewOrders',
              {id:food._id,
               quantity:q,
               status:menu,
               user_id:this.user.getUserId()   
              }
            ).pipe(tap(responseData=>{
              this.order.setNewOrder(responseData);
            }))
      }
  }

  setCartOrder(food:Food,q:number,menu:string)
  {
   return this.http
          .post<Order[]>(
            url+'/insertCartOrders',
            {
           user_id:this.user.getUserId(),
         id:food._id,
             quantity:q,
             status:menu   
            },{observe:'response'}
          )
  }

  getOrders()
  {
    return this.http
          .post<Order[]>(
            url+'/getOrders',{
              user_id:this.user.getUserId()
            }
          ).pipe(tap(responseData=>{
            this.order.setOrders(responseData);
          }))
  }


  moveOrders(id:number)
  {
    return this.http
          .post<string>(
            url+'/moveOrders',{
              id:id
            }
          )

  }

  getOrderByType(menu:string)
  {
    return this.http
          .post<Order[]>(
            url+'/getOrderByType',{
              menu:menu,
              id:this.user.getUserId()
            }
          )
  }

  updateOrder(quantity:number,id:number)
  {
       return this.http
          .post<Order[]>(
            url+'/updateQuantity',{
              quantity:quantity,
              id:id
            }
          ).pipe(tap(data=>{
            console.log(data);
            this.order.updateOrder(id,data[0]);
          }))
      
  }

  delete(id:number)
  {
    return this.http
          .post<Order[]>(
            url+'/delete_order',{

              id:id
            }
          )
  }

  setPay(user:any,price:number,payMethod:string,order:Order[])
  {
    return this.http
          .post<any>(
            url+'/pay',{
              id:this.user.getUserId(),
              user:user,
              price:price,
              payMethod:payMethod,
              order:order
            }
          )
  }

  setToOrderedItems(orders:Order[])
  {
    return this.http
          .post<any>(
            url+'/setToOrdered',{
              orders:orders,
              user_id:this.user.getUserId()
            }
          )
  }

  cancelOrder(orders:Order[])
  {
    return this.http
          .post<any>(
            url+'/cancel',{
              orders:orders
            }
          )
  }

  saveData(form:any,email:string)
  {
    return this.http
          .post<any>(
            url+'/saveAddress',{
              form:form,
              email:email
            }
          )
    }

}

