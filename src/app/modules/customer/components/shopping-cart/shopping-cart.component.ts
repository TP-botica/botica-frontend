import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../../../../service/shopping-cart.service';
import { ProductShoppingCart } from '../../../../domain/product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {
  productsList:ProductShoppingCart[] = [];
  subtotal = 0;

  constructor(private router: Router, private shoppingCartService: ShoppingCartService){
    this.shoppingCartService.cart$.subscribe(cart => {
      this.productsList = cart
    });
    this.calculateSubtotal()
  }

  calculateSubtotal(){
    this.subtotal = 0;
    this.productsList.forEach(element => {
      this.subtotal += (element.price * element.quantity)
    });
  }


  updateCart(){
    this.calculateSubtotal()
    this.shoppingCartService.updateLocalStorage(this.productsList);
  }

  deleteProduct(productId: any, drugstoreId: any){
    this.shoppingCartService.removeFromCart(productId, drugstoreId);
  }}
