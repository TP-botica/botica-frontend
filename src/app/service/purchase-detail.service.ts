import { Injectable } from '@angular/core';
import { myUrl } from '../constants/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PurchaseDetail } from '../domain/purchase';

@Injectable({
  providedIn: 'root'
})
export class PurchaseDetailService {
  url = `${myUrl}/purchaseDetail`
  headers = new HttpHeaders()
  constructor(private http:HttpClient) { 
    this.headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
  }

  //customer and drugstore
  getPurchaseDetails(id:any) {
    const token = localStorage.getItem('token');
    const headers = this.headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<PurchaseDetail[]>(`${this.url}/allByPurchase/${id}`, { headers: headers });
  }
}
