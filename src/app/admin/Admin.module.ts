import { NgModule } from '@angular/core';
import{ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
// import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminfoodComponent } from './adminfood/adminfood.component';
import { FoodmenuComponent } from './adminfood/foodmenu/foodmenu.component';
import { AddFoodComponent } from './adminfood/add-food/add-food.component';
import { ViewFoodComponent } from './adminfood/view-food/view-food.component';
import { OrdersComponent } from './orders/orders.component';
import { AdminHomeComponent} from './home/home.component';
import { ViewOrdersComponent } from './orders/view-orders/view-orders.component';
import { ViewDeliveredComponent } from './orders/view-delivered/view-delivered.component';
import {AdminRoutingModule} from './Admin-routing.module';
import {SharedModule} from '../shared.module';
@NgModule({
  declarations:
   [
    AdminComponent,
    // AdminHeaderComponent,
    AdminfoodComponent,
    FoodmenuComponent,
    AddFoodComponent,
    ViewFoodComponent,
    OrdersComponent,
    AdminHomeComponent,
    ViewOrdersComponent,
    ViewDeliveredComponent
  ],
  imports: [
  	FormsModule,
  	ReactiveFormsModule,
    AdminRoutingModule,
    SharedModule
  ],

})
export class AdminModule {}
