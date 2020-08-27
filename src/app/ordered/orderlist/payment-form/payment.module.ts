import{User} from '../../../user/user.module';
import{Order} from '../../../ordered/order.module';
export class Payment
{
	public userdata:any;
	public order:Order[];

	constructor(userdata:any,order:Order[])
	{
		this.userdata=userdata;
		this.order=order;
	
	}

}