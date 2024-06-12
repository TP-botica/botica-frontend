import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../domain/product';
import { ProductService } from '../../../../service/product.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Role } from '../../../../domain/role';
import { RoleService } from '../../../../service/role.service';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}


@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrl: './search-product.component.css'
})
export class SearchProductComponent implements OnInit{
  value: string = '0';
  stateOptions: any[] = [{ label: 'Productos', value: '0' },{ label: 'Servicios', value: '1' }];

  products!: Product[];

  formGroup!: FormGroup;

  filteredProducts: any[] = [];

  roles: Role[] | undefined;

  selectedRole: Role | undefined;
  
  constructor(roleService: RoleService, private productService: ProductService){
    roleService.getRoles().subscribe({
      next: (res: any) => {
        this.roles = res
      }
    })
  }


  ngOnInit() {
      this.productService.getProducts().then((data) => (this.products = data.slice(0, 12)));
      this.formGroup = new FormGroup({
        selectedCountry: new FormControl<object | null>(null)
    });
  }

  filterProduct(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.products as any[]).length; i++) {
        let product = (this.products as any[])[i];
        if (product.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(product);
        }
    }

    this.filteredProducts = filtered;
}
 
}
