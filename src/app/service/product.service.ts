import { Injectable } from '@angular/core';
import { myUrl } from '../constants/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product, Option, ProductServiceView } from '../domain/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    url = `${myUrl}/product`
    headers = new HttpHeaders()
    
    constructor(private http : HttpClient) { 
      this.headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }

    getProducts() {
        return this.http.get<ProductServiceView[]>(`${this.url}/all`, { headers: this.headers });
    }
    getMyProducts(id:any) {
        return this.http.get<Product[]>(`${this.url}/allMyProducts/${id}`, { headers: this.headers });
    }
    getProductsByCategory(id:any) {
      return this.http.get<ProductServiceView[]>(`${this.url}/allByCategory/${id}`, { headers: this.headers });
  }
    getProductOptions() {
      return this.http.get<Option[]>(`${this.url}/all/options`, { headers: this.headers });
  }

}
