import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSelectModule }  from '@angular/material/select'; 
import { MatFormFieldModule }  from '@angular/material/form-field'; 
import { FormControl } from '@angular/forms';



@NgModule({
  declarations: [
    
  ],
  imports: [
    AppComponent,
    FormControl,
    MatSelectModule,
    MatFormFieldModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
