import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import{ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { OrderedComponent } from './ordered.component';
import { OrderMenuComponent } from './order-menu/order-menu.component';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { OrderitemComponent } from './orderlist/orderitem/orderitem.component';
import { PaymentFormComponent } from './orderlist/payment-form/payment-form.component';
import {SharedModule} from '../shared.module';
import {OrderRoutingModule} from './order-routing.module';
@NgModule({
  declarations:
   [
    OrderedComponent,
    OrderMenuComponent,
    OrderlistComponent,
    OrderitemComponent,
    PaymentFormComponent,
  ],
  imports: [
  	FormsModule,
  	ReactiveFormsModule,
	RouterModule,
	OrderRoutingModule,
	SharedModule
  ],

})
export class ClientOrderModule {}