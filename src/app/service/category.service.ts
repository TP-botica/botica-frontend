import { Injectable } from '@angular/core';
import { myUrl } from '../constants/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Option } from '../domain/product';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = `${myUrl}/category`
  headers = new HttpHeaders()
  
  constructor(private http : HttpClient) { 
    this.headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
  }

  //customer
  getCategoryServiceOptions() {
    const token = localStorage.getItem('token');
    const headers = this.headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<Option[]>(`${this.url}/all/serviceOptions`, { headers: headers });
  }

  //customer
  getCategoryProductOptions() {
    const token = localStorage.getItem('token');
    const headers = this.headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<Option[]>(`${this.url}/all/productOptions`, { headers: headers });
  }
}
