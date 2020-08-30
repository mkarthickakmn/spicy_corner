
import{NgModule} from '@angular/core';
import{Routes,RouterModule} from '@angular/router';
import{OrderedComponent} from '../ordered/ordered.component';
import{OrderlistComponent} from '../ordered/orderlist/orderlist.component';
import{OrderEditComponent} from '../ordered/orderlist/orderitem/order-edit/order-edit.component';
import{OrderResolverService} from '../order-resolver.service';
import{AuthGuard} from '../auth.guard';

const appRoutes:Routes=[
						{path:'',component:OrderedComponent,canActivate:[AuthGuard],resolve:[OrderResolverService],
						children:[{path:'',component:OrderlistComponent,},
							{path:':id',component:OrderlistComponent},
							{path:':id/edit',component:OrderEditComponent}],

						}
						]
			
							
				
@NgModule({

	imports :[RouterModule.forChild(appRoutes)],
	exports:[RouterModule]
})
export class OrderRoutingModule{}