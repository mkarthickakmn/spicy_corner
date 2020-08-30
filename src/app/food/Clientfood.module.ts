import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import{ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FoodComponent } from './food.component';
import { FoodtypesComponent } from './foodtypes/foodtypes.component';
import { FooditemComponent } from './foodlist/fooditem/fooditem.component';
import { FoodlistComponent } from './foodlist/foodlist.component';
import{FoodquantityComponent} from './foodlist/fooditem/foodquantity/foodquantity.component'
import{ClientFoodRoutingModule} from './Clientfood-routing.module';
import {SharedModule} from '../shared.module';
@NgModule({
  declarations:
   [
    FoodComponent,
    FoodtypesComponent,
    FoodlistComponent,
    FooditemComponent,
    FoodquantityComponent,
  ],
  imports: [
  	FormsModule,
  	ReactiveFormsModule,
	RouterModule,
	ClientFoodRoutingModule,
	SharedModule
  ],

})
export class ClientFoodModule {}
