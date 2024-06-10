import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialNavbarComponent } from './components/initial-navbar/initial-navbar.component';
import { CustomerNavbarComponent } from './components/customer-navbar/customer-navbar.component';
import { DrugstoreNavbarComponent } from './components/drugstore-navbar/drugstore-navbar.component';
import { authGuard } from '../../guards/auth.guard';
import { customerGuard } from '../../guards/customer.guard';
import { drugstoreGuard } from '../../guards/drugstore.guard';

const routes: Routes = [
  {
    path:'',
    component: InitialNavbarComponent,
    loadChildren: () =>
      import ('../presentation/presentation.module').then(m=>m.PresentationModule)
  },
  {
    path:'customer',
    component: CustomerNavbarComponent,
    loadChildren: () =>
      import ('../customer/customer.module').then(m=>m.CustomerModule),
    canActivate: [authGuard, customerGuard],
  },
  {
    path:'drugstore',
    component: DrugstoreNavbarComponent,
    loadChildren: () =>
      import ('../drugstore/drugstore.module').then(m=>m.DrugstoreModule),
    canActivate: [authGuard, drugstoreGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
