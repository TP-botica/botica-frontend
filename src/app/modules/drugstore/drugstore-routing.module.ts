import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrugstoreHomeComponent } from './components/drugstore-home/drugstore-home.component';
import { ProductComponent } from './components/product/product.component';
import { SaleComponent } from './components/sale/sale.component';
import { ServiceComponent } from './components/service/service.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

const routes: Routes = [
  {path: '', component: DrugstoreHomeComponent},
  {path: 'product', component:ProductComponent},
  {path: 'service', component:ServiceComponent},
  {path: 'edit-profile', component:EditProfileComponent},
  {path: 'sale', component:SaleComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrugstoreRoutingModule { }
