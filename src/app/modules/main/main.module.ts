import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { InitialNavbarComponent } from './components/initial-navbar/initial-navbar.component';
import { DrugstoreNavbarComponent } from './components/drugstore-navbar/drugstore-navbar.component';
import { CustomerNavbarComponent } from './components/customer-navbar/customer-navbar.component';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { OverlayPanelModule } from 'primeng/overlaypanel';


@NgModule({
  declarations: [
    InitialNavbarComponent,
    DrugstoreNavbarComponent,
    CustomerNavbarComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MenubarModule, BadgeModule, AvatarModule, InputTextModule, RippleModule, ButtonModule, SidebarModule,
    OverlayPanelModule
  ]
})
export class MainModule { }
