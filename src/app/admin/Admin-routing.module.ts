import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import{AdminComponent} from '../admin/admin/admin.component';
import{AdminfoodComponent} from '../admin/adminfood/adminfood.component';
import{AddFoodComponent} from '../admin/adminfood/add-food/add-food.component';
import{ViewFoodComponent} from '../admin/adminfood/view-food/view-food.component'
import{OrdersComponent} from '../admin/orders/orders.component';
import{ViewOrdersComponent}from '../admin/orders/view-orders/view-orders.component';
import{ViewDeliveredComponent}from '../admin/orders/view-delivered/view-delivered.component';
import { AdminHomeComponent} from '../admin/home/home.component';
import{AdminResolverService} from '../admin-resolver.service';
import{AdminOrderResolverService} from '../adminorder-resolver.service';
const routes: Routes = [
  {path:'',component:AdminComponent,resolve:[AdminResolverService],
							children:[{path:'home',component:AdminHomeComponent},
							{path:'foodmenu',component:AdminfoodComponent,
							children:[{path:'addFood',component:AddFoodComponent},
									{path:'viewFood',component:ViewFoodComponent}]
							},
							{path:'admin_orders',component:OrdersComponent,resolve:[AdminOrderResolverService],
							children:[{path:'view_orders',component:ViewOrdersComponent},
										{path:'view_delivered',component:ViewDeliveredComponent}]
							}
							]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
