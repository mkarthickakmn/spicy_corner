import{Injectable} from '@angular/core';
import{FoodTimings} from './food/foodtimings.module';
import{HttpClient}from '@angular/common/http';
@Injectable({providedIn:'root'})
export class FoodTimingService{
	constructor(private http:HttpClient){}
	private timings:FoodTimings[]=[
		{timings_id:1,type:"breakfast",description:"Have a Good breakfast!!!!!",s_time:7,e_time:12},
		{ timings_id:2,type:"lunch",description:"Have a awesome Lunch!!!!!",s_time:12,e_time:15},
		{timings_id:3, type:"Snacks",description:"Its Snacks Time!!!!!",s_time:15,e_time:19},
		{ timings_id:4,type:"dinner",description:"Have a delicius Dinner!!!!!",s_time:19,e_time:24},
	]

	getTimings()
	{
		// this.http
  //     .get<FoodTimings[]>(
  //       'http://localhost:3000/timings'
  //     )
  //     .subscribe(responseData => {
  //       this.timings=responseData;
      
  //     });

      return this.timings;
	
	}

	
}