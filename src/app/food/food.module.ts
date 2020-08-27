import{FoodTimings} from './foodtimings.module';
export class Food{
	public _id:string;
	public image:string;
	public name:string;
	public description:string;
	public amount:number;
	public quantity:number;
	public timings_id:number
	public timings:FoodTimings;
	constructor(food_id:string,image:string,name:string,description:string,amount:number,quantity:number,timings:FoodTimings){
		this._id=food_id;
		this.name=name;
		this.image=image;
		this.description=description;
		this.amount=amount;
		this.quantity=quantity;
		this.timings=timings;
	}
}