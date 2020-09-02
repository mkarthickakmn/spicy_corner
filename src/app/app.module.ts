import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import {ClientFoodModule} from './food/Clientfood.module';
import {AdminModule} from './admin/Admin.module';
import {ClientOrderModule} from './ordered/ClientOrder.module';
// import { FoodComponent } from './food/food.component';
// import { FoodtypesComponent } from './food/foodtypes/foodtypes.component';
// import { FooditemComponent } from './food/foodlist/fooditem/fooditem.component';
// import { FoodlistComponent } from './food/foodlist/foodlist.component';
// import { OrderedComponent } from './ordered/ordered.component';
// import{FoodquantityComponent} from './food/foodlist/fooditem/foodquantity/foodquantity.component'
import{AppRoutingModule} from './app-routing.module';
// import { FilterPipe } from './filter.pipe';
// import { OrderMenuComponent } from './ordered/order-menu/order-menu.component';
// import { OrderlistComponent } from './ordered/orderlist/orderlist.component';
// import { OrderitemComponent } from './ordered/orderlist/orderitem/orderitem.component';
// import { PaymentFormComponent } from './ordered/orderlist/payment-form/payment-form.component';
import { UserComponent } from './user/user.component';
import{HttpClientModule}from '@angular/common/http';
// import { AdminComponent } from './admin/admin/admin.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
// import { AdminfoodComponent } from './admin/adminfood/adminfood.component';
// import { FoodmenuComponent } from './admin/adminfood/foodmenu/foodmenu.component';
// import { AddFoodComponent } from './admin/adminfood/add-food/add-food.component';
// import { ViewFoodComponent } from './admin/adminfood/view-food/view-food.component';
// import { OrdersComponent } from './admin/orders/orders.component';
// import { AdminHomeComponent} from './admin/home/home.component';
// import { ViewOrdersComponent } from './admin/orders/view-orders/view-orders.component';
// import { ViewDeliveredComponent } from './admin/orders/view-delivered/view-delivered.component';
import{LoaderComponent} from './loader/loader.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    // FoodComponent,
    // OrderedComponent,
    // FoodtypesComponent,
    // FoodlistComponent,
    // FooditemComponent,
    // FoodquantityComponent,
    // FilterPipe,
    // OrderMenuComponent,
    // OrderlistComponent,
    // OrderitemComponent,
    // PaymentFormComponent,
    UserComponent,
    // AdminComponent,
    AdminHeaderComponent,
    // AdminfoodComponent,
    // FoodmenuComponent,
    // AddFoodComponent,
    // ViewFoodComponent,
    // OrdersComponent,
    // ViewOrdersComponent,
    // ViewDeliveredComponent,
    LoaderComponent,
    // AdminHomeComponent
      ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    // ClientFoodModule,
    // AdminModule
  ],
   // providers:[FilterPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
