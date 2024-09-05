import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductShoppingCart } from '../domain/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private cart = new BehaviorSubject<ProductShoppingCart[]>(this.getCartFromLocalStorage());
  cart$ = this.cart.asObservable();

  private getCartFromLocalStorage(): ProductShoppingCart[] {
    const cart = localStorage.getItem('shoppingCart');
    return cart ? JSON.parse(cart) : [];
  }

  updateLocalStorage(cart: ProductShoppingCart[]) {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
  }

  addToCart(product: ProductShoppingCart) {
    const currentCart = this.cart.value;
    const productExists = currentCart.some(item => item.id === product.id && item.drugstoreId === product.drugstoreId);

    if (!productExists) {
      const updatedCart = [...currentCart, product];
      this.cart.next(updatedCart);
      localStorage.setItem('shoppingCart', JSON.stringify(updatedCart));
    }
  }

  removeFromCart(productId: any, drugstoreId: any) {
    const currentCart = this.cart.value;
    const updatedCart = currentCart.filter(item => !(item.id === productId && item.drugstoreId === drugstoreId));
    
    this.cart.next(updatedCart);
    this.updateLocalStorage(updatedCart);
  }

  clearCart() {
    this.cart.next([]); 
    localStorage.removeItem('shoppingCart'); 
  }
  
}