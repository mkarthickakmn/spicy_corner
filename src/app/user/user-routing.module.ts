
import{NgModule} from '@angular/core';
import{Routes,RouterModule} from '@angular/router';
import{UserComponent} from './user.component'
const appRoutes:Routes=[
						{path:'user',component:UserComponent}
						]
							
						

@NgModule({

	imports :[RouterModule.forChild(appRoutes)],
	exports:[RouterModule]
})
export class UserRoutingModule{}