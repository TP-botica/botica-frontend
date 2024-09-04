import { Injectable } from '@angular/core';
import { myUrl } from '../constants/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Option, ProductServiceView } from '../domain/product';
import { Service, ServiceInfo } from '../domain/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
    url = `${myUrl}/service`
    headers = new HttpHeaders()
    
    constructor(private http : HttpClient) { 
      this.headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
    }

    //customer
    getServiceById(serviceId: any){
      const token = localStorage.getItem('token');
      const headers = this.headers.set('Authorization', `Bearer ${token}`);
      return this.http.get<ServiceInfo>(`${this.url}/searchById/${serviceId}`, { headers: headers });
    }

    //customer
    getServices() {
      const token = localStorage.getItem('token');
      const headers = this.headers.set('Authorization', `Bearer ${token}`);
      return this.http.get<ProductServiceView[]>(`${this.url}/all`, { headers: headers });
    }

    //drugstore
    getMyServices(id:any) {
      const token = localStorage.getItem('token');
      const headers = this.headers.set('Authorization', `Bearer ${token}`);
        return this.http.get<Service[]>(`${this.url}/allMyServices/${id}`, { headers: headers });
    }

    //customer
    getServicesByCategory(id:any) {
      const token = localStorage.getItem('token');
      const headers = this.headers.set('Authorization', `Bearer ${token}`);
      return this.http.get<ProductServiceView[]>(`${this.url}/allByCategory/${id}`, { headers: headers });
  }

  //drugstore
    getServiceOptions(id:any) {
      const token = localStorage.getItem('token');
      const headers = this.headers.set('Authorization', `Bearer ${token}`);
      return this.http.get<Option[]>(`${this.url}/all/options/${id}`, { headers: headers });
  }

}
