import { Component,OnInit } from '@angular/core';
import{Router} from '@angular/router';
import{UserService} from './user.service';
import{OrderService} from "./orderservice.service";
// import{SwPush} from '@angular/service-worker';
import{PushNotificationService}from './PushNotification.service';
// import{ChatService} from './contact/chat.service';
// {"publicKey":"BF7os0_sOIDP0hd1D4Db7BZ7zZUrpUKeVWEEUnofdWcl3pZxHyL--k6mU0n5s5dNBZI0vdjR0ZslWyBG7Wujepg","privateKey":"Q9OTu8GN4zIFpSCahiT64myP77D6SCNBCDEyhgzwJ3o"}
const VAPID_PUBLIC="BBM03EvU6sNyctD7Gk2hPnEoZVGHK_Mq4NqM3T9Fs6qgoyKSFQAiYm3sLFcLWiwKiBL_h8M-Q9Okw1HsIPLsgn8";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
 
})
export class AppComponent  implements OnInit  {
	constructor(private userService:UserService,private pushService: PushNotificationService,
		private orderservice:OrderService){
		
		 // if (swPush.isEnabled) {
	  //     		swPush
	  //       .requestSubscription({
	  //         serverPublicKey: VAPID_PUBLIC
	  //       })
	  //       .then(subscription => {
	  //         pushService.sendSubscriptionToTheServer(subscription).subscribe();
	  //       })
	  //       .catch(console.error);
   //  	}
		
  }

	 admin:boolean=false;
	 title="firstApp";
	ngOnInit()
	{
		this.userService.autoLogin();
		this.userService.isAdmin.
		subscribe(()=>
			{
				this.admin=true;
				console.log(this.admin)
			});
	}

	new(e:boolean)
	{
		this.admin=e;
	}

}

  



