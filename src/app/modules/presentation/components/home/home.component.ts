import { Component, OnInit } from '@angular/core';
import { CarouselService } from '../../../../service/carousel.service';
import { CarouselItem } from '../../../../domain/carousel-item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [CarouselService]
})
export class HomeComponent implements OnInit{
  items: CarouselItem[] = [];

  responsiveOptions: any[] = [];

  constructor(private carouselService: CarouselService) {}

  ngOnInit() {
      this.items = this.carouselService.getData();

      this.responsiveOptions = [
          {
              breakpoint: '3000px',
              numVisible: 1,
              numScroll: 1
          },
          {
              breakpoint: '991px',
              numVisible: 1,
              numScroll: 1
          },
          {
              breakpoint: '767px',
              numVisible: 1,
              numScroll: 1
          }
      ];
  }

}
