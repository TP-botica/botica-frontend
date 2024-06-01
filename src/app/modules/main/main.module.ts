import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { InitialNavbarComponent } from './components/initial-navbar/initial-navbar.component';
import { DrugstoreNavbarComponent } from './components/drugstore-navbar/drugstore-navbar.component';
import { CustomerNavbarComponent } from './components/customer-navbar/customer-navbar.component';


@NgModule({
  declarations: [
    InitialNavbarComponent,
    DrugstoreNavbarComponent,
    CustomerNavbarComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
