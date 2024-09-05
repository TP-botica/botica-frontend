import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ShoppingCartService } from '../../../../service/shopping-cart.service';
import { ProductShoppingCart } from '../../../../domain/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-navbar',
  templateUrl: './customer-navbar.component.html',
  styleUrl: './customer-navbar.component.css'
})
export class CustomerNavbarComponent implements OnInit {
  items: MenuItem[] | undefined;
  sidebarVisible: boolean = false;
  value!: number;
  productsList:ProductShoppingCart[] = [];

  constructor(private router: Router, private shoppingCartService: ShoppingCartService){

  }

  ngOnInit() {
    this.shoppingCartService.cart$.subscribe(cart => {
      this.productsList = cart
      this.value = cart.length;
    });
      this.items = [
          {
              label: 'Inicio',
              route:'/customer'
          },
          {
            label: 'Buscar',
            route:'/customer/search-product'
          },
          {
              label: 'Mis Compras',
              route:'/customer/purchase'
          }
      ]
  }

  deleteProduct(productId: any, drugstoreId: any){
    this.shoppingCartService.removeFromCart(productId, drugstoreId);
  }

  logout(){
    this.shoppingCartService.clearCart(); 
    localStorage.clear();
    this.router.navigate(['/']);
}
}
