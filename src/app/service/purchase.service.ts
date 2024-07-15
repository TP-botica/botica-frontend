import { Injectable } from '@angular/core';
import { myUrl } from '../constants/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Purchase } from '../domain/purchase';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  url = `${myUrl}/purchase`
  headers = new HttpHeaders()
  constructor(private http:HttpClient) { 
    this.headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    .append('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }

  //drugstores
  getMySales(id:any) {
    return this.http.get<Purchase[]>(`${this.url}/allMySales/${id}`, { headers: this.headers });
  }

  //customer
  getMyPurchases(id:any) {
    return this.http.get<Purchase[]>(`${this.url}/allMyPurchases/${id}`, { headers: this.headers });
  }
}
