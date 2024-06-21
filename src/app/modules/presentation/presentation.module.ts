import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PresentationRoutingModule } from './presentation-routing.module';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import {GoogleMap,MapMarker} from '@angular/google-maps';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [HomeComponent, LoginComponent,RegisterComponent],
  imports: [
    CommonModule,
    PresentationRoutingModule,
    CarouselModule, ButtonModule, TagModule, InputTextModule,DropdownModule,FormsModule,ReactiveFormsModule,GoogleMap,MapMarker,
    ToastModule
  ]
})
export class PresentationModule { }
