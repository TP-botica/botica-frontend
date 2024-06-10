import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrugstoreRoutingModule } from './drugstore-routing.module';
import { ProductComponent } from './components/product/product.component';

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
import { ChartModule } from 'primeng/chart';
import { SaleComponent } from './components/sale/sale.component';
import { DrugstoreHomeComponent } from './components/drugstore-home/drugstore-home.component';
import { ServiceComponent } from './components/service/service.component';

@NgModule({
  declarations: [ProductComponent, SaleComponent, DrugstoreHomeComponent, ServiceComponent],
  imports: [
    CommonModule,
    DrugstoreRoutingModule,
    TableModule, ToolbarModule, ToastModule, ButtonModule,
     TagModule, RadioButtonModule, FormsModule, ConfirmDialogModule, DropdownModule, DialogModule,
    InputTextModule, InputTextareaModule, InputNumberModule,
    ChartModule
  ]
})
export class DrugstoreModule { }
