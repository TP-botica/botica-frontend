import { Component, OnInit } from '@angular/core';
import { ProductServiceView } from '../../../../domain/product';
import { ProductService } from '../../../../service/product.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Role } from '../../../../domain/role';
import { RoleService } from '../../../../service/role.service';
import { ServiceService } from '../../../../service/service.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {
  value: boolean = true;

  products!: ProductServiceView[];
  formGroup!: FormGroup;
  filteredProducts: ProductServiceView[] = [];
  roles: Role[] | undefined;
  selectedRole: Role | undefined;
  displayProducts: ProductServiceView[] = [];

  constructor(private roleService: RoleService, private productService: ProductService, private serviceService: ServiceService) {
    this.roleService.getRoles().subscribe({
      next: (res: any) => {
        this.roles = res;
      }
    });
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts().subscribe({
      next: (res) => { this.products = res; 
        this.displayProducts = this.products
      }
    });
  }
  getServices(){
    this.serviceService.getServices().subscribe({
      next: (res) => { this.products = res; 
        this.displayProducts = this.products
      }
    });
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      selectedProduct: new FormControl<object | null>(null)
    });
  }

  filterProduct() {
    let query = this.formGroup.get('selectedProduct')?.value;
    if (typeof query === 'string' && query.length > 3) {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      this.displayProducts = this.filteredProducts;
    } else if (typeof query === 'object' && query !== null) {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(query.name.toLowerCase())
      );
      this.displayProducts = this.filteredProducts;
    } else {
      this.filteredProducts = [];
      this.displayProducts = this.products;
    }
  }

  change(){
    if(this.value){
      this.getProducts()
    }
    else{
      this.getServices()
    }
  }
}