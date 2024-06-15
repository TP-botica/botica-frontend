import { Injectable } from '@angular/core';
import { myUrl } from '../constants/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Option, ProductServiceView } from '../domain/product';
import { Service } from '../domain/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
    url = `${myUrl}/service`
    headers = new HttpHeaders()
    
    constructor(private http : HttpClient) { 
      this.headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }
    getServices() {
      return this.http.get<ProductServiceView[]>(`${this.url}/all`, { headers: this.headers });
    }

    getMyServices(id:any) {
        return this.http.get<Service[]>(`${this.url}/allMyServices/${id}`, { headers: this.headers });
    }

    getServiceOptions() {
      return this.http.get<Option[]>(`${this.url}/all/options`, { headers: this.headers });
  }

}
