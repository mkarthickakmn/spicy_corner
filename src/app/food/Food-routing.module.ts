
import{NgModule} from '@angular/core';
import{Routes,RouterModule} from '@angular/router';
import{FoodResolverService}from '../foodresolver.service';
import{AuthGuard} from '../auth.guard';
import{FoodComponent} from './food.component'
import{FoodquantityComponent} from './foodlist/fooditem/foodquantity/foodquantity.component';

const appRoutes:Routes=[
							{path:'food',component:FoodComponent,resolve:[FoodResolverService],
							children:[
							{path:':id',component:FoodquantityComponent,canActivate:[AuthGuard]}
							]}
						]
			
							
				
@NgModule({

	imports :[RouterModule.forChild(appRoutes)],
	exports:[RouterModule]
})
export class FoodRoutingModule{}