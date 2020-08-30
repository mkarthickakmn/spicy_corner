
import{NgModule} from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import{HomeComponent} from './home/home.component'
// import{FoodComponent} from './food/food.component'
import{OrderedComponent} from './ordered/ordered.component';
import{OrderlistComponent} from './ordered/orderlist/orderlist.component';
import{OrderEditComponent} from './ordered/orderlist/orderitem/order-edit/order-edit.component';
// import{FoodquantityComponent} from './food/foodlist/fooditem/foodquantity/foodquantity.component';
import{UserComponent} from './user/user.component';

// import{AdminComponent} from './admin/admin/admin.component';
// import{AdminfoodComponent} from './admin/adminfood/adminfood.component';
// import{AddFoodComponent} from './admin/adminfood/add-food/add-food.component';
// import{ViewFoodComponent} from './admin/adminfood/view-food/view-food.component'
// import{OrdersComponent} from './admin/orders/orders.component';
// import{ViewOrdersComponent}from './admin/orders/view-orders/view-orders.component';
// import{ViewDeliveredComponent}from './admin/orders/view-delivered/view-delivered.component';
// import { AdminHomeComponent} from './admin/home/home.component';
// import{FoodResolverService}from './foodresolver.service';
import{OrderResolverService} from './order-resolver.service'
import{AuthGuard} from './auth.guard';
// import{AdminResolverService} from './admin-resolver.service';
// import{AdminOrderResolverService} from './adminorder-resolver.service';
const appRoutes:Routes=[{path:'',redirectTo:'home',pathMatch:'full'},
						{path:'home',component:HomeComponent},
						// {path:'food',component:FoodComponent,resolve:[FoodResolverService],
						// children:[{path:':id',component:FoodquantityComponent,canActivate:[AuthGuard]}]},
						// loadChildren: './recipes/recipes.module#RecipesModule' 
						{path: 'food', loadChildren: './food/Clientfood.module#ClientFoodModule' },
						// {path:'order',component:OrderedComponent,canActivate:[AuthGuard],resolve:[OrderResolverService],
						// children:[{path:'',component:OrderlistComponent,},
						// 		{path:':id',component:OrderlistComponent},
						// 		{path:':id/edit',component:OrderEditComponent}],

						// 	},
						{path: 'order', loadChildren: './ordered/ClientOrder.module#ClientOrderModule' },						
							{path:'user',component:UserComponent},
							{ path: 'admin', loadChildren: './admin/Admin.module#AdminModule' },
							// {path:'admin',component:AdminComponent,resolve:[AdminResolverService],
							// children:[{path:'home',component:AdminHomeComponent},
							// {path:'foodmenu',component:AdminfoodComponent,
							// children:[{path:'addFood',component:AddFoodComponent},
							// 		{path:'viewFood',component:ViewFoodComponent}]
							// },
							// {path:'admin_orders',component:OrdersComponent,resolve:[AdminOrderResolverService],
							// children:[{path:'view_orders',component:ViewOrdersComponent},
							// 			{path:'view_delivered',component:ViewDeliveredComponent}]
							// }
							// ]},
							]
							
						

@NgModule({

	imports :[RouterModule.forRoot(appRoutes,{ preloadingStrategy: PreloadAllModules })],
	exports:[RouterModule]
})
export class AppRoutingModule{}