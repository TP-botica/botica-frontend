import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-drugstore-navbar',
  templateUrl: './drugstore-navbar.component.html',
  styleUrl: './drugstore-navbar.component.css'
})
export class DrugstoreNavbarComponent implements OnInit {
  items: MenuItem[] | undefined;
  
  ngOnInit() {
    this.items = [
        {
            label: 'Inicio',
            route:'/drugstore'
        },
        {
            label: 'Mis productos',
            route:'/drugstore/product'
        },
        {
            label: 'Mis ventas',
            route:'/drugstore/sale'
        }
    ]
}
}
