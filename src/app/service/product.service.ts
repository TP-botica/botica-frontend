import { Injectable } from '@angular/core';
import { myUrl } from '../constants/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../domain/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    url = `${myUrl}/product`
    constructor(private http : HttpClient) { }



    getMyProducts(id:any) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          });
        return this.http.get<Product[]>(`${this.url}/allMyProducts/${id}`, { headers: headers });;
    }

}
