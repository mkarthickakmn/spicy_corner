import { Component, OnInit,ViewChild } from '@angular/core';
import{NgForm} from '@angular/forms';
import{UserService} from '../user.service';
import{Router} from '@angular/router';
// import{ChatService} from '../contact/chat.service'
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService:UserService,private router:Router) { }
  @ViewChild('reg') form1:NgForm;
  @ViewChild('log') form2:NgForm;
  ngOnInit(): void {

    this.otpvalue="submit otp";
    if((JSON.parse(localStorage.getItem('spicy_user'))))
      if((JSON.parse(localStorage.getItem('spicy_user')))[0].userEmail!=="mkarthickakmn@gmail.com")
      {
        this.router.navigate(['/home']);
      }
      else
      {
        this.router.navigate(['/admin/home']);
      }
    
  }
  loginMode:boolean=true;
  error:string=null;
  forgetPwd:boolean=true;
  cnf:boolean=true;
  forget:boolean=false;
 email:string='';
 resend:boolean=true;
 loading:boolean=false;
 otpvalue:string="submit otp";
  register(form1:NgForm)
  {
    this.error=null;
  	console.log(form1.value);
    this.userService.reg(form1.value).subscribe(responseData=>{
      // if(responseData.status==200)
      {
          alert("User data added successfully");
          this.loginMode=true;
      }
      },errormessage=>{
        this.error=errormessage;
      });

  }

  login(form2:NgForm)
  {
    this.error=null;
  	console.log(form2.value);
    this.loading=true;
  	this.userService.login(form2.value).subscribe(responseData=>{
      console.log(responseData);
      this.loading=false;
      // if(responseData.status==200)
      {
        this.userService.setUser(responseData);
        this.userService.loggedIn.next(responseData);
        this.userService.autoLogout(600*1000);
        if(responseData[0].userEmail==="mkarthickakmn@gmail.com")
        { 
          this.userService.setAdmin();         
          // this.chatService.newUser(responseData.body[0].userEmail);
          this.router.navigate(['/admin/home']);
        }
        else
          {
            // this.chatService.newUser(responseData.body[0].userEmail);
            this.router.navigate(['/food']);
          }
      }
      },errormessage=>{
        this.error=errormessage;
        this.loading=false;

      });
  }

 submitOtp(otp)
 {
     if(this.otpvalue=="submit otp")
     {
          this.userService.submitOtp(otp.value).subscribe(response=>{
        clearInterval(this.interval);
         this.cnf=false;
         this.forgetPwd=true;  
       
         },errormessage=>{
            this.error=errormessage;
          });
     }
     else
     {
         this.resendOtp(this.email);
     }
   
    
 }
interval:any;
timeLeft:any;
  sendOtp(email)
  {
      this.email=email.value;   
      this.loading=true;
       this.userService.sendOtp(email.value).subscribe(data=>{
        console.log(data);
       this.loading=false;
       alert('Otp has been sent to ur mail id');
       this.forgetPwd=!this.forgetPwd; 
      this.forget=true;
       this.timeLeft=data.timer;
       var timer=1000;
      this.interval = setInterval(() => {
      if(this.timeLeft>0)
      {
        this.timeLeft--;
      }
      else
      {
        clearInterval(this.interval);
        this.userService.submitOtp("").subscribe();
        this.otpvalue="resend otp";
        this.resend=false;

      }
    },timer);
  
       },errormessage=>{
          this.error=errormessage;
          this.loading=false;
       });       
  }

   resendOtp(email)
  {
       this.loading=true;
       this.userService.sendOtp(email).subscribe(data=>{
         this.loading=false;
        alert('Otp has been sent to ur mail id');
       this.resend=true;
       this.otpvalue="submit otp";
      this.forget=true;
       this.timeLeft=data.timer;
       var timer=1000;
      this.interval = setInterval(() => {
      if(this.timeLeft>0)
      {
        this.timeLeft--;
      }
      else
      {
        clearInterval(this.interval);
        this.userService.submitOtp("").subscribe();
        this.otpvalue="resend otp";
        this.resend=false;

      }
    },timer);
  
       },errormessage=>{
          this.error=errormessage;
          this.loading=false;
       });       
  }

  confirmPwd(cnf)
  {
      if(cnf.value.newpassword==cnf.value.cnfpassword)
      {
        this.userService.updatePwd(this.email,cnf.value.newpassword).subscribe(data=>{
          alert('password updated successfully');
          this.cnf=true;
          this.forget=false;
          this.error=null;
        },errormessage=>{
          this.error="invalid password";
          this.loading=false;
       });    ;
      }
      
  }

}
