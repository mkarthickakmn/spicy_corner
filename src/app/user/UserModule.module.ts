import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import{ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
import{UserComponent} from './user.component';
import {UserRoutingModule} from './user-routing.module';
import{SharedModule} from '../shared.module';

@NgModule({
  declarations: [
    UserComponent,
   // FilterPipe
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
  	BrowserModule,
  	FormsModule,
  	RouterModule ,
    UserRoutingModule,
    SharedModule
  ],
  exports:[
    UserComponent
  ]
})
export class UserModule {}
