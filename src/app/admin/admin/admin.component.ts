import { Component, OnInit } from '@angular/core';
import{PushNotificationService} from '../../PushNotification.service';
// import{ChatService} from '../../contact/chat.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private PushNotification:PushNotificationService) { }

  ngOnInit(): void {
  	// console.log("notification triggered");
  	//   setInterval(()=>{
   //      this.PushNotification.getNotification().subscribe();
   //    },30000);

      
  }

  

}
