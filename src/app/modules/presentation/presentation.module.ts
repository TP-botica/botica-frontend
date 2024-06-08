import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PresentationRoutingModule } from './presentation-routing.module';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    PresentationRoutingModule,
    CarouselModule, ButtonModule, TagModule
  ]
})
export class PresentationModule { }
