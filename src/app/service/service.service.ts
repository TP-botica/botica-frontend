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
      .append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }

    //customer
    getServiceById(serviceId: any){
      return this.http.get<ServiceInfo>(`${this.url}/searchById/${serviceId}`, { headers: this.headers });
    }

    //customer
    getServices() {
      return this.http.get<ProductServiceView[]>(`${this.url}/all`, { headers: this.headers });
    }

    //drugstore
    getMyServices(id:any) {
        return this.http.get<Service[]>(`${this.url}/allMyServices/${id}`, { headers: this.headers });
    }

    //customer
    getServicesByCategory(id:any) {
      return this.http.get<ProductServiceView[]>(`${this.url}/allByCategory/${id}`, { headers: this.headers });
  }

  //drugstore
    getServiceOptions(id:any) {
      return this.http.get<Option[]>(`${this.url}/all/options/${id}`, { headers: this.headers });
  }

}
