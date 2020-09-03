import { Component, OnInit } from '@angular/core';
import{AdminFoodService} from '../adminfoodservice.service';
import{AdminService} from '../adminservice.service';
// import{ChatService} from '../../contact/chat.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private adminfood:AdminFoodService,private admin:AdminService) { }
  users:any;
  ngOnInit(): void {
  	this.admin.getUsers().subscribe(data=>{
  		console.log(data);
      this.users=data;
  	});
  }

}
