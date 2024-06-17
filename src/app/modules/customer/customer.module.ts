import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DataViewModule } from 'primeng/dataview';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FloatLabelModule } from 'primeng/floatlabel';
import { OrderListModule } from 'primeng/orderlist';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CardModule } from 'primeng/card';


import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerHomeComponent } from './components/customer-home/customer-home.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { SearchProductComponent } from './components/search-product/search-product.component';
import { MapComponent } from './components/map/map.component';
import { Map2Component } from './components/map-2/map-2.component';


@NgModule({
  declarations: [CustomerHomeComponent, PurchaseComponent, SearchProductComponent, MapComponent, Map2Component],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    TableModule, ToolbarModule, ToastModule, ButtonModule, TagModule, RadioButtonModule, FormsModule, ConfirmDialogModule, 
    DropdownModule, DialogModule, InputTextModule, InputTextareaModule, InputNumberModule, SelectButtonModule, DataViewModule
    ,ReactiveFormsModule, AutoCompleteModule, FloatLabelModule, OrderListModule,ToggleButtonModule,CardModule
  ]
})
export class CustomerModule { }
