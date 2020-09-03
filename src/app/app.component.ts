import { Component,OnInit } from '@angular/core';
import{Router} from '@angular/router';
import{UserService} from './user.service';
import{OrderService} from "./orderservice.service";
// import{SwPush} from '@angular/service-worker';
import{PushNotificationService}from './PushNotification.service';
// import{ChatService} from './contact/chat.service';
import{MessagingService} from './messaging.service';
const VAPID_PUBLIC="BEWIp3Js3csi8YcJhBcpZPnseMSUnTrTWh9WIbtP5yp1gC-XQJWxUGopGw5wIH5yGW59lW7v4CeL7K75FhpGAdI";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
 
})

// "publicKey":"BEWIp3Js3csi8YcJhBcpZPnseMSUnTrTWh9WIbtP5yp1gC-XQJWxUGopGw5wIH5yGW59lW7v4CeL7K75FhpGAdI","privateKey":"_XbnZ9jw4XJrO53HXOs-1xOkKUHoZeZQ0s9Wh0wIAzo"
export class AppComponent  implements OnInit  {
	constructor(private userService:UserService,private pushService: PushNotificationService,
		private orderservice:OrderService,private messagingService:MessagingService){
		
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
		const userId = 'user001';
	    this.messagingService.requestPermission();
	    this.messagingService.receiveMessage()
	    console.log(this.messagingService.currentMessage);
		

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

  



