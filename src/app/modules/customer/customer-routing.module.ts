import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerHomeComponent } from './components/customer-home/customer-home.component';
import { PayComponent } from './components/pay/pay.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { SearchProductComponent } from './components/search-product/search-product.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { SuccessfulPurchaseComponent } from './components/successful-purchase/successful-purchase.component';
import { MapComponent } from './components/map/map.component';

const routes: Routes = [
  {path: '', component: CustomerHomeComponent},
  {path: 'map/:productId', component:MapComponent},
  {path: 'pay', component:PayComponent},
  {path: 'purchase', component:PurchaseComponent},
  {path: 'search-product', component:SearchProductComponent},
  {path: 'shopping-cart', component:ShoppingCartComponent},
  {path: 'succesful-purchase', component:SuccessfulPurchaseComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
