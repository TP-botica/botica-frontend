import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../domain/product';
import { ProductService } from '../../../../service/product.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.css'
})
export class PurchaseComponent implements OnInit {
  products!: Product[];
  product!: Product;
  productDialog: boolean = false;

  constructor( private productService: ProductService){
  
  }

  ngOnInit() {
    this.productService.getProducts().then((data) => {
      this.products = data;
  });
  }

  editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
  }

hideDialog() {
  this.productDialog = false;}
}
