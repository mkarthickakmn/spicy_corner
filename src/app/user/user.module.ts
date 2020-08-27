export class User
{
	public user_id:string;
	public username:string;
	public userpassword:string;
	public userEmail:string;
	public address:string;
	public phone:number;


	constructor(user_id:string,username:string,userpassword:string,userEmail:string,
		address:string,phone:number)
	{
		this.user_id=user_id;
		this.username=username;
		this.userpassword=userpassword;
		this.userEmail=userEmail;
		this.address=address;
		this.phone=phone;
	}
}