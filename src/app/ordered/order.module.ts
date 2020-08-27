import{Food} from '../food/food.module';
export class Order{
	public _id:number;
	public food_id:number;
	public food:Food;
	public order_quantity:number;
	public order_status:string;

	constructor(order_id:number,food:Food,order_quantity:number,order_status:string){
		this._id=order_id
		this.food=food;
		this.order_quantity=order_quantity;
		this.order_status=order_status;
	}
}