import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import{UserService} from '../../user.service'
@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  constructor(private userService: UserService) { }
  user:string="";
  ngOnInit(): void {

      this.user=this.userService.getUser()[0].username+"/"+this.userService.getUser()[0].userEmail;

  }
  @Output()admin1=new EventEmitter<boolean>();
  
  logOut()
  {
    this.userService.logOut();
		this.admin1.emit(false);
  }
}
