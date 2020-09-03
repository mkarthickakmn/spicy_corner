import{Injectable,EventEmitter,OnInit} from '@angular/core';
import{BehaviorSubject} from 'rxjs';
import{FoodTimingService} from './foodtimings.service';
import{Food} from './food/food.module'
import{FoodTimings} from './food/foodtimings.module'
import{HttpClient}from '@angular/common/http';
import{map} from 'rxjs/operators';
import{UserService} from './user.service';
import{DataStorageService}from './data-storage.service'
@Injectable({providedIn:'root'})
export class FoodService implements OnInit {
  constructor(private foodTimings:FoodTimingService,
    private http:HttpClient){}
   timings:FoodTimings[]=this.foodTimings.getTimings();
   foodByType=new EventEmitter<string>();

   private food:any=[];
    
   ngOnInit()
   {
     
     
   }

   setFood(food:Food[])
   {
     this.food=food;

      for(let x in this.food)
      {
          
          const y= this.timings.find((food)=>{
               if(food.timings_id==this.food[x].timings_id)
               {          
                   this.food[x].timings=food;
                   return this.food[x];
               }
          })
        }
   }

 
 
	// [new Food
	//   (1,"https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/AN138-Pizza-732x549-Thumb.jpg?w=756&h=567",
	// 	"pizza","good",120,50,this.timings[3]),
 //  	new Food
 //  	(2,"https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/AN138-Pizza-732x549-Thumb.jpg?w=756&h=567",
 //  		"burger","nice",100,30,this.timings[3]),
 //  	new Food
 //  	(3,"https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/AN138-Pizza-732x549-Thumb.jpg?w=756&h=567",
 //  		"coke","superb",50,100,this.timings[3]),
 //    new Food
 //    (4,"https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/AN138-Pizza-732x549-Thumb.jpg?w=756&h=567",
 //      "briyani","superb",80,5,this.timings[1]),
 //    new Food
 //    (5,"https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/AN138-Pizza-732x549-Thumb.jpg?w=756&h=567",
 //      "idly","superb",10,40,this.timings[0]),
 //    new Food
 //    (6,"https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/AN138-Pizza-732x549-Thumb.jpg?w=756&h=567",
 //      "chips","superb",15,10,this.timings[2]),
 //    new Food
 //    (7,"https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/AN138-Pizza-732x549-Thumb.jpg?w=756&h=567",
 //      "dosai","spicy",20,40,this.timings[0])

 //    ];

  	getFoodItems()
  	{

  		return this.food.slice();
  	}
    
    getFoodItemsById(id:string)
    {

        let foodById:Food[];
        for(let x in this.food)
        {
            if(this.food[x]._id==id)
            {
                 return [this.food[x]];
            }
        }
    }

    getfoodServicesByTimings()
    {
  
      let time;
      let foodByTime=[];

      time=(new Date().getHours()+(new Date().getMinutes()/60));
      for(let x in this.food)
      {
          
          const y= this.timings.find((food)=>{
               if(food.timings_id==this.food[x].timings_id)
               {          
                   this.food[x].timings=food;
                   return this.food[x];
               }
          })
          if(this.food[x].timings.s_time<=time&&time<this.food[x].timings.e_time)
          {
              foodByTime.push(this.food[x]);
          }
      }

          return foodByTime;
    }

    getFoodType()
    {
      let time=(new Date().getHours()+(new Date().getMinutes()/60));
       const y= this.timings.find((food)=>{
            if(food.s_time<time&&time<food.e_time)
            {
                return food;
            }
        })
        return y;
    }

    getfoodServicesByType(type:string)
    {
      let foodByType=[];
      console.log(this.food);
      for(let x in this.food)
      {
          if(this.food[x].timings.type==type)
          {
              foodByType.push(this.food[x]);
          }
      }
      return foodByType;
    }

    countFoodByType()
    {
      let c:number[]=[],i:number=0,count:number=1;
      let timing=this.foodTimings.getTimings();
     c=[0,0,0,0];
        for(let y in timing)
        {
           for(let x in this.food)
            {
               if(this.food[x].timings.type==timing[y].type)
               {

                   c[i]=count;
                  
                   count++;
               }
            }

        i++;
        count=1;
       
      }
      return c;
    }

    updateQuantity(id:string,quantity:number)
    {
         for(let x in this.food)
        {
            if(this.food[x]._id==id)
            {
               this.food[x].quantity=quantity;
               break;
            }
        }
    }
 
}