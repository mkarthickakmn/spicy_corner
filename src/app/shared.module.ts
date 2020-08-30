import { NgModule } from '@angular/core';

import { FilterPipe } from './filter.pipe';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations:
   [
    
    FilterPipe
  ],
  imports: [
  	// FormsModule,
  	CommonModule,
  ],
  exports:
  [
  	CommonModule,
  	FilterPipe
  ],

   providers:[FilterPipe],

})
export class SharedModule {}

