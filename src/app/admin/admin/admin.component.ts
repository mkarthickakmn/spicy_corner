import { Component, OnInit } from '@angular/core';
import{PushNotificationService} from '../../PushNotification.service';
import{SwPush} from '@angular/service-worker';
const VAPID_PUBLIC="BEWIp3Js3csi8YcJhBcpZPnseMSUnTrTWh9WIbtP5yp1gC-XQJWxUGopGw5wIH5yGW59lW7v4CeL7K75FhpGAdI";
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private pushService:PushNotificationService,private swPush:SwPush) {
   if (swPush.isEnabled) {
            swPush
          .requestSubscription({
            serverPublicKey: VAPID_PUBLIC
          })
          .then(subscription => {
            pushService.sendSubscriptionToTheServer(subscription).subscribe();
          })
          .catch(console.error);
      } 
    }
    

    ngOnInit()
    {
      this.pushService.getNotification().subscribe();
    }
  

}
