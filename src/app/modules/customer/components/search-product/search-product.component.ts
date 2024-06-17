import { Component, OnInit } from '@angular/core';
import { Option, ProductServiceView } from '../../../../domain/product';
import { ProductService } from '../../../../service/product.service';
import { FormControl, FormGroup } from '@angular/forms';
import { RoleService } from '../../../../service/role.service';
import { ServiceService } from '../../../../service/service.service';
import { CategoryService } from '../../../../service/category.service';
import { Router } from '@angular/router';

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
  options: Option[] | undefined;
  selectedOption: Option | undefined;
  displayProducts: ProductServiceView[] = [];

  constructor(private roleService: RoleService, private productService: ProductService,
     private serviceService: ServiceService, private categoryService: CategoryService, private router: Router) {
    this.getProductCategories();
    this.getProducts();
  }

  getProductCategories(){
    this.categoryService.getCategoryProductOptions().subscribe({
      next: (res)=> {this.options = res;}
    })
  }

  getServiceCategories(){
    this.categoryService.getCategoryServiceOptions().subscribe({
      next: (res)=> {this.options = res;}
    })
  }

  getProducts(){
    this.productService.getProducts().subscribe({
      next: (res) => { this.products = res; 
        this.displayProducts = this.products
      }
    });
  }

  getProductsByCategory(id: string){
    this.productService.getProductsByCategory(id).subscribe({
      next: (res) => { this.products = res; 
        this.displayProducts = this.products
      }
    });
  }

  getServicesByCategory(id: string){
    this.serviceService.getServicesByCategory(id).subscribe({
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

  filterByCategory(){
    if(this.selectedOption && this.value){
      this.getProductsByCategory(this.selectedOption.id)
    }
    else if(this.selectedOption && !this.value){
      this.getServicesByCategory(this.selectedOption.id)
    }
    else if(this.value){
      this.getProducts()
    }
    else{
      this.getServices()
    }
  }

  gotoMapProduct(productId: string){
    this.router.navigate(['/customer/mapProduct', productId]);
  }

  gotoMapService(serviceId: string){
    this.router.navigate(['/customer/mapService', serviceId]);
  }


  change(){
    if(this.value){
      this.getProducts()
      this.getProductCategories()
    }
    else{
      this.getServices()
      this.getServiceCategories()
    }
  }
}