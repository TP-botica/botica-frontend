import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../../../../service/shopping-cart.service';
import { ProductShoppingCart } from '../../../../domain/product';
import { PurchaseRegister } from '../../../../domain/purchase';
import { PurchaseService } from '../../../../service/purchase.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {
  productsList:ProductShoppingCart[] = [];
  subtotal = 0;
  visible: boolean = false;
  purchase: PurchaseRegister = {
    customerId: localStorage.getItem("profileId"),
    drugstoreId:"",
    purchaseDetails: []
  }

  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';

  isFormValid(): boolean {
    return this.cardNumber.length === 19 && this.expiryDate.length === 5 && this.cvv.length === 3;
  }

  constructor(private router: Router, private shoppingCartService: ShoppingCartService, private purchaseService: PurchaseService){
    this.shoppingCartService.cart$.subscribe(cart => {
      this.productsList = cart
    });
    this.calculateSubtotal()
  }

  showDialog() {
      this.visible = true;
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
  }

  transformCartToPurchaseRegisters(cart: ProductShoppingCart[]): PurchaseRegister[] {
    // Crear un mapa para agrupar productos por drugstoreId
    const groupedByDrugstore = cart.reduce((acc, product) => {
        // Si no existe el drugstoreId en el acumulador, lo inicializa con un array vacío
        if (!acc[product.drugstoreId]) {
            acc[product.drugstoreId] = [];
        }
        // Añadir el producto a la farmacia correspondiente
        acc[product.drugstoreId].push(product);
        return acc;
    }, {} as { [key: string]: ProductShoppingCart[] });

    // Transformar los grupos en objetos PurchaseRegister
    return Object.keys(groupedByDrugstore).map(drugstoreId => {
        const products = groupedByDrugstore[drugstoreId];
        return {
            customerId: localStorage.getItem('profileId'),
            drugstoreId: drugstoreId,
            purchaseDetails: products.map(product => ({
                productId: product.id,  
                quantity: product.quantity,
                price: product.price,
                discount: 0
            }))
        };
    });
  }

  buy(){
    let purchasesToRegister = this.transformCartToPurchaseRegisters(this.productsList)
    purchasesToRegister.forEach(e => 
      {
        this.purchaseService.registerPurchase(e).subscribe(()=>{
          this.shoppingCartService.clearCart()
          this.router.navigate(['/customer/pruchase-success'])
        });
      }
    )
    this.visible = false
  }

  isShoppingCartEmpty(): boolean {
    const cart = localStorage.getItem('shoppingCart');
  
    if (!cart || cart === '[]') {
      return false;  
    }
  
    return true;
  }

  autoCorrectMonth() {
    const [month, year] = this.expiryDate.split('/').map(Number);
    
    if (month > 12) {
        this.expiryDate = `12/${year.toString().padStart(2, '0')}`;
    }
}

}
