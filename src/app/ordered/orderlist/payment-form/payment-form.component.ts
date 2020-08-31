import { Component, OnInit,Input,ViewChild,ElementRef } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import{ActivatedRoute,Params,Router} from '@angular/router';
import{OrderService} from "../../../orderservice.service";
import{UserService} from '../../../user.service';
import{User} from '../../../user/user.module';
import{Order} from '../../../ordered/order.module'
import{DataStorageService}from '../../../data-storage.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {

@Input()order:Order[]; 
  constructor(private orderservice:OrderService,
    private userService:UserService,
    private datastorage:DataStorageService,private route:Router,private router:ActivatedRoute) { }
  @ViewChild('pay') pay:ElementRef; 
  paymentForm:FormGroup;
   id:number=null;
   menu:string;
   price:number;
   button:string="edit";
   user:User;
  ngOnInit(): void {
    this.orderservice.orderType.subscribe(

        (menu:string)=>{
          this.menu=menu;
          if(!menu)
          {
            
            this.datastorage.getOrderByType("New Orders").subscribe(data=>
              {
                      
                    this.price=this.orderservice.getTotal("New Orders",data);
                     
              })
          }

          else
          {
            
            this.datastorage.getOrderByType(menu).subscribe(
              data=>
                {

                    if((menu=="New Orders"||menu=="CartOrders")&&data.length>0)
                     {
              
                       this.price=this.orderservice.getTotal(menu,data);
                       
                     }
              
                  }
                   
                 
              );
  
          }
        
        });

    this.user=this.userService.getUser()[0];
  	this.paymentForm=new FormGroup({
		'address':new FormControl(this.user.address,Validators.required),
		'phone':new FormControl(this.user.phone,Validators.required),
  	});
    this.paymentForm.disable();

    this.router.params.subscribe((params:Params)=>{
      this.id=params['id'];
    });
  }
  submit()
  {   
     this.datastorage.setToOrderedItems(this.order).subscribe(
           data=>{
             this.datastorage.setPay(this.paymentForm.value,this.price,
             this.pay.nativeElement.value,this.order).subscribe(data=>{
               alert('Your Order has been successfully placed!!!');
              this.datastorage.getOrders().subscribe();
              if(this.id)
                this.route.navigate(['/order']);
               else   
                this.route.navigate(['order'],{relativeTo:this.router});
                this.orderservice.notification.next();
                 })
             });
     
  }

  edit()
  {
    if(this.button=="save")
    {
      this.paymentForm.disable();
      this.datastorage.saveData(this.paymentForm.value,this.user.userEmail).
        subscribe(data=>{
           alert('User Details saved succesfully');
          console.log(data);
          localStorage.setItem('spicy_user',JSON.stringify(data));
          this.userService.setUser(data);
        })
      this.button="edit";
    }
    else
    {
      this.paymentForm.enable();
      this.button="save";
      // document.getElementById('submit').disabled=true;
      }
  }

  cancel()
  {
    this.datastorage.cancelOrder(this.order).subscribe(
             data=>{
               alert('Your Orderlist has been deleted!!!');
                this.datastorage.getOrders().subscribe();
               if(this.id)
                  this.route.navigate(['/order']);
               else   
                  this.route.navigate(['order'],{relativeTo:this.router});

             }
           );;

  }
}
