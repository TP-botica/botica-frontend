import { Injectable } from '@angular/core';
import { myUrl } from '../constants/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Purchase, PurchaseRegister } from '../domain/purchase';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  url = `${myUrl}/purchase`
  headers = new HttpHeaders()
  constructor(private http:HttpClient) { 
    this.headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
  }

  //drugstores
  getMySales(id:any) {
    const token = localStorage.getItem('token');
    const headers = this.headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<Purchase[]>(`${this.url}/allMySales/${id}`, { headers: headers });
  }

  //customer
  getMyPurchases(id:any) {
    const token = localStorage.getItem('token');
    const headers = this.headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<Purchase[]>(`${this.url}/allMyPurchases/${id}`, { headers: headers });
  }

  //customer
  registerPurchase(purchase: any){
    console.log(purchase)

    const token = localStorage.getItem('token');
    const headers = this.headers.set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.url}/register`, purchase, { headers: headers } );
  }
}
