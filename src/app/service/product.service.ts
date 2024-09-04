import { Injectable } from '@angular/core';
import { myUrl } from '../constants/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product, Option, ProductServiceView, ProductInfo } from '../domain/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    url = `${myUrl}/product`
    headers = new HttpHeaders()
    
    constructor(private http : HttpClient) { 
      this.headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
    }

    //customer
    getProductById(productId: any) {
      const token = localStorage.getItem('token');
      const headers = this.headers.set('Authorization', `Bearer ${token}`);
      return this.http.get<ProductInfo>(`${this.url}/searchById/${productId}`, { headers: headers });
    }

    //customer
    getProducts() {
        const token = localStorage.getItem('token');
        const headers = this.headers.set('Authorization', `Bearer ${token}`);
        return this.http.get<ProductServiceView[]>(`${this.url}/all`, { headers: headers });
    }

    //drugstore
    getMyProducts(id:any) {
        const token = localStorage.getItem('token');
        const headers = this.headers.set('Authorization', `Bearer ${token}`);
        return this.http.get<Product[]>(`${this.url}/allMyProducts/${id}`, { headers: headers });
    }

    //customer
    getProductsByCategory(id:any) {
      const token = localStorage.getItem('token');
      const headers = this.headers.set('Authorization', `Bearer ${token}`);
      return this.http.get<ProductServiceView[]>(`${this.url}/allByCategory/${id}`, { headers: headers });
  }

  //drugstore
    getProductOptions(id:any) {
      const token = localStorage.getItem('token');
      const headers = this.headers.set('Authorization', `Bearer ${token}`);
      return this.http.get<Option[]>(`${this.url}/all/options/${id}`, { headers: headers });
  }

}
