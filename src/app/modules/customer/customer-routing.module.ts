import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerHomeComponent } from './components/customer-home/customer-home.component';
import { PayComponent } from './components/pay/pay.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { SearchProductComponent } from './components/search-product/search-product.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { SuccessfulPurchaseComponent } from './components/successful-purchase/successful-purchase.component';
import { MapComponent } from './components/map/map.component';
import { Map2Component } from './components/map-2/map-2.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { PurchaseSuccessComponent } from './components/purchase-success/purchase-success.component';

const routes: Routes = [
  {path: '', component: CustomerHomeComponent},
  {path: 'mapProduct/:productId', component:MapComponent},
  {path: 'mapService/:serviceId', component:Map2Component},
  {path: 'pay', component:PayComponent},
  {path: 'purchase', component:PurchaseComponent},
  {path: 'search-product', component:SearchProductComponent},
  {path: 'shopping-cart', component:ShoppingCartComponent},
  {path: 'succesful-purchase', component:SuccessfulPurchaseComponent},
  {path: 'edit-profile', component:EditProfileComponent},
  {path: 'pruchase-success', component: PurchaseSuccessComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
