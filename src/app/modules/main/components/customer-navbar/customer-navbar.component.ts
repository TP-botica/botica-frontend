import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-customer-navbar',
  templateUrl: './customer-navbar.component.html',
  styleUrl: './customer-navbar.component.css'
})
export class CustomerNavbarComponent implements OnInit {
  items: MenuItem[] | undefined;
  sidebarVisible: boolean = false;

  constructor(private router: Router){
    
  }

  ngOnInit() {
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

  logout(){
    localStorage.clear();
    this.router.navigate(['/']);
}
}
