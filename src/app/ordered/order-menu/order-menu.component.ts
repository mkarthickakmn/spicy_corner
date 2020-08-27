import { Component, OnInit } from '@angular/core';
import{OrderService} from '../../orderservice.service';
import{Router,ActivatedRoute,Params} from '@angular/router';
import{DataStorageService}from '../../data-storage.service'
import{Order} from '../../ordered/order.module';
@Component({
  selector: 'app-order-menu',
  templateUrl: './order-menu.component.html',
  styleUrls: ['./order-menu.component.css']
})
export class OrderMenuComponent implements OnInit {

  constructor(private orderservice:OrderService,private router:Router,private route:ActivatedRoute,private datastorage:DataStorageService) { }

orderMenu=["New Orders","CartOrders","Ordered Items"];
no:number;
click:boolean=false;
count:number[];
orders:Order[]=[];
  ngOnInit(): void {

this.route.queryParams.
      subscribe((params:Params)=>{
        if(params.back)
        {
          this.click=true;
          if(params.back==this.orderMenu[1])
          {
            this.no=1;
          }
          else if(params.back==this.orderMenu[0])
          {
            this.no=0;
          }
          else
          {
            this.no=2;
          }
        }
        
      });

  this.count=[0,0,0]
      this.orderservice.orderCount.
      subscribe(()=>{
              this.count=this.orderservice.countOrders();
      })
  }

  order(i:number,menu:string)
  {
  	this.no=i;
  	this.click=true;
  	this.orderservice.orderType.next(menu);
    this.router.navigate(['/order']);
  }

}
