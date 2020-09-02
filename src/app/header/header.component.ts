import { Component, OnInit } from '@angular/core';
import{OrderService} from '../orderservice.service'
import{UserService} from '../user.service';
import{DataStorageService}from '../data-storage.service';
import{ActivatedRoute,Params,Router} from '@angular/router';
// import{ChatService}from '../contact/chat.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private orderservice:OrderService,
    private userService:UserService,private data:DataStorageService,private route:Router,
    private router:ActivatedRoute) { }

  log:string="";
  user:string="";
  show:boolean;
  ngOnInit(): void {

  	this.userService.loggedIn.
  	subscribe((log)=>{
      if(log)
  		{  
        this.user=this.userService.getUser()[0].username+"/"+this.userService.getUser()[0].userEmail;
        this.log="logout";
      }
      else
      {
        this.log="login/signUp";
      }
  	})
  }

  logOut()
  {
    if(this.log=="logout")
    {
      // this.chatservice.disconnected(this.userService.getUser()[0].userEmail);
      this.user="";
      this.userService.logOut(); 
    }
     
  }

  serve()
  {
    this.data.readyToServe().subscribe();
  }

  orders()
  {
    if(this.log=="logout")
    {
       this.orderservice.orderType.next(null);
      this.data.getOrders().subscribe();
    
    }
   
  }

}
