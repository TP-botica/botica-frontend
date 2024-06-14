import { Component, OnInit, ViewChild } from '@angular/core';
import { Product, ProductOption } from '../../../../domain/product';
import { ProductService } from '../../../../service/product.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DrugstoreProductService } from '../../../../service/drugstore-product.service';
import { DrugstoreProduct, DrugstoreProductEditable } from '../../../../domain/drugstore-product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  providers: [MessageService, ConfirmationService]
})
export class ProductComponent implements OnInit{
  @ViewChild('dt') dt: Table | undefined;

  productDialog: boolean = false;

  products!: Product[];

  product!: Product;

  productOptions: ProductOption[] | undefined;

  selectedProduct: ProductOption | undefined;

  submitted: boolean = false;

  create: boolean = false;

  statuses!: any[];

  constructor(private productService: ProductService, private messageService: MessageService,
     private confirmationService: ConfirmationService, private drugstoreProductService: DrugstoreProductService) {
        productService.getProductOptions().subscribe({
            next: (res: any) => {
              this.productOptions = res
            }
          })
     }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.productService.getMyProducts(localStorage.getItem('profileId')).subscribe({
        next: (res)=> {this.products = res},
        error: (err) => {console.log(err)}
      })
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  openNew() {
      this.selectedProduct = undefined;
      this.product = {};
      this.submitted = false;
      this.productDialog = true;
      this.create = true;
  }

  editProduct(product: Product) {
      this.create = false;
      this.product = { ...product };
      this.productDialog = true;
  }

  deleteProduct(product: Product) {
      this.confirmationService.confirm({
          message: 'Seguro que quieres eliminar ' + product.name + '?',
          header: 'Confirmar',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.drugstoreProductService.deleteDrugstoreProduct(localStorage.getItem('profileId'),product.productId).subscribe({
                next: ()=> {
                    this.getProducts()
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Producto Eliminado', life: 3000 });}
              })
          }
      });
  }

  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }

  saveProduct() {
      this.submitted = true;

      if (this.product.name?.trim() || this.selectedProduct?.name.trim()) {
          if (this.product.productId) {
              let drugstoreProduct: DrugstoreProductEditable = {
                price: this.product.price,
                stock:this.product.stock
              }
              this.products[this.findIndexById(this.product.productId)] = this.product;

              this.drugstoreProductService.updateDrugstoreProduct(localStorage.getItem('profileId'),this.product.productId,drugstoreProduct).subscribe({
                next: () => { 
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Producto Actualizado', life: 3000 });}
              })

          } else {
            let drugstoreProduct: DrugstoreProduct= {
                drugstoreId: localStorage.getItem('profileId'),
                productId: this.selectedProduct?.id,
                price: this.product.price,
                stock:this.product.stock
              }
            this.drugstoreProductService.addDrugstoreProduct(drugstoreProduct).subscribe({
                next: () => { 
                    this.getProducts();
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Producto Creado', life: 3000 });},
                error: () => {this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Producto ya registrado', life: 3000 })}
              })
          }

          this.products = [...this.products];
          this.productDialog = false;
          this.product = {};
      }
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].productId === id) {
              index = i;
              break;
          }
      }

      return index;
  }

}