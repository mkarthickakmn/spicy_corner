import {Injectable} from '@angular/core';
import {User} from './user/user.module';
import{HttpClient,HttpEventType,HttpErrorResponse} from '@angular/common/http';
import{tap,catchError} from 'rxjs/operators';
import{throwError,Subject,BehaviorSubject} from 'rxjs';
import{FoodService} from './foodservice.service';
import{DataStorageService}from './data-storage.service';
import{ActivatedRoute,Params,Router} from '@angular/router';
@Injectable({
	providedIn:'root'
})
export class UserService
{
	constructor(private http:HttpClient,private food:FoodService,private route:Router){}
		private user:User;	
		private error:string="";
		loggedIn=new BehaviorSubject<User>(null);
		private timer:any;
		private exp_timer:any;
		admin:boolean=false;
		isAdmin=new Subject<void>();
		expirationDate:any;
	
	setAdmin()
	{
		this.isAdmin.next();
	}
	// isAdmin()
	// {
	// 	return this.admin;
	// }
	getUser()
	{		
		return this.user;
	}
	setUser(user:User)
	{
		if(user)
		{
			this.user=(user);
			
		}
	
	}
	getUserId()
	{
		return this.user[0]._id;
	}

	login(user:User)
	{

		return this.http.post<User>("http://localhost:3000/login",
			{
				user:user
			}).
		pipe(catchError(this.handleError),
			tap(user=>{
				localStorage.setItem('user',JSON.stringify(user));
			 	this.expirationDate = new Date().getTime()+(600 * 1000);
				localStorage.setItem('exp',(this.expirationDate));
				console.log(this.expirationDate);	
			}));
			
	}


	logOut()
	{
	  this.loggedIn.next(null);
      localStorage.clear();
      if(this.timer)
  		clearTimeout(this.timer);
	}

	autoLogout(exp_timer)
	{	
		console.log("started "+exp_timer);
		// this.timer=setTimeout(()=>
		// 	{
		// 		 this.loggedIn.next(null);
		// 		 localStorage.clear();
		// 		 this.route.navigate(['/user']);
		// 		 alert("Oops,Session Timed Out!!!");
		// 	},exp_timer);
	
	}

	autoLogin()
	{
		let user:User=(JSON.parse(localStorage.getItem('user')))
		this.loggedIn.next(user);
		this.setUser(user);
		if(user)
		{

   			console.log(localStorage.getItem('exp'));
   			this.exp_timer=(localStorage.getItem('exp'));
   			let time= this.exp_timer-new Date().getTime();
			this.autoLogout(time);	
		}
	}

	reg(user:User)
	{
		return this.http.post<User>("http://localhost:3000/register",
			{
				user:user
			}).
		pipe(catchError(this.handleError));
	}

	sendOtp(email)
	{
		return this.http.post<any>("http://localhost:3000/sendOtp",{
			email:email
		}).pipe(catchError(this.handleError));
	}

	submitOtp(otp)
	{
		return this.http.post<any>("http://localhost:3000/subOtp",{
			otp:otp
		}).pipe(catchError(this.handleError));
	}

	updatePwd(email,pwd)
	{
		return this.http.post<any>("http://localhost:3000/updatePwd",{
			email:email,
			pwd:pwd
		})
	}


	private handleError(error:HttpErrorResponse)
	{
		console.log(error);
			if(error.status===401)
			{
				this.error="You are not registered yet!";
			}
			else if(error.status===502)
			{
				this.error="invalid credentials";
			}
			else if(error.status===403)
			{
				this.error="User data already exists";
			}
			else if(error.status==400) 
			{
				this.error="otp mismatched";
			}
			else 
			{
				this.error="Network Error";
			}
			// this.err.next(this.error);
		console.log(this.error);
		return throwError(this.error);
	}	

}