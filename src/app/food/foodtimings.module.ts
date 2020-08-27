
export class FoodTimings
{
	public timings_id:number;
	public type:string;
	public description:string
	public s_time:number;
	public e_time:number;

	constructor(type:string,description:string,s_time:number,e_time:number){
		this.type=type;
		this.description=description;
		this.s_time=s_time;
		this.e_time=e_time;
	}
}
