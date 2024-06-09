import { Injectable } from '@angular/core';
    
@Injectable()
export class CarouselService {
    getData() {
        return [
            {
                name: '',
                imageUrl: '1.png',
            },
            {
                name: '',
                imageUrl: '2.png',
            },
            {
                name: '',
                imageUrl: '3.png',
            },
            {
                name: '',
                imageUrl: '4.png',
            },
            {
                name: '',
                imageUrl: '5.png',
            }
        ];
    }
};