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
    .append('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }

  //customer
  getCategoryServiceOptions() {
    return this.http.get<Option[]>(`${this.url}/all/serviceOptions`, { headers: this.headers });
  }

  //customer
  getCategoryProductOptions() {
    return this.http.get<Option[]>(`${this.url}/all/productOptions`, { headers: this.headers });
  }
}
