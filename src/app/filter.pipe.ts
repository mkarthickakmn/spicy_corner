import { Pipe, PipeTransform } from '@angular/core';
import{FoodTimings} from './food/foodtimings.module';
import{Food} from './food/food.module';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, search:string,name:string,type?:string): any {
    if(search===''&&value.length>0)
    	return value;
    else
    {

    	let array=[];
    	for(let item of value)
    	{   
             if(search===item[name].substring(0,search.length))
            {

                array.push({...item});
            }
    			
    	}
    	if(array)
    		{
                return array;
            }
        }
    	
    	
    }
    
  }


