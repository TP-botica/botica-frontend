import { Injectable } from '@angular/core';
    
@Injectable()
export class CarouselService {
    getData() {
        return [
            {
                name: 'Bamboo Watch',
                description: 'Product Description',
                imageUrl: 'bamboo-watch.jpg',
            },
            {
                name: 'Black Watch',
                description: 'Product Description',
                imageUrl: 'black-watch.jpg',
            },
            {
                name: 'Blue Band',
                description: 'Product Description',
                imageUrl: 'blue-band.jpg',
            },
            {
                name: 'Sneakers',
                description: 'Product Description',
                imageUrl: 'sneakers.jpg',
                
            },
        ];
    }
};