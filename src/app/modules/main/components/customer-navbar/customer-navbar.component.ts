import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-customer-navbar',
  templateUrl: './customer-navbar.component.html',
  styleUrl: './customer-navbar.component.css'
})
export class CustomerNavbarComponent implements OnInit {
  items: MenuItem[] | undefined;
  sidebarVisible: boolean = false;

  ngOnInit() {
      this.items = [
          {
              label: 'Inicio',
              route:'/customer'
          },
          {
              label: 'Compras',
              route:'/customer/purchase'
          },
          {
              label: 'Buscar',
              route:'/customer/search-product'
          }
      ]
  }
}
