import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-initial-navbar',
  templateUrl: './initial-navbar.component.html',
  styleUrl: './initial-navbar.component.css'
})
export class InitialNavbarComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
      this.items = [
          {
              label: 'Inicio',
              route:''
          },
          {
              label: 'Contáctanos',
              route:'/contact-us'
          },
          {
              label: 'Registro',
              route:'/register'
          },
          {
              label: 'Login',
              route:'/login'
          }
      ]
  }
}