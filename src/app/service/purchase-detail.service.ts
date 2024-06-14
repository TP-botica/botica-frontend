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
    .append('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }

  getPurchaseDetails(id:any) {
    return this.http.get<PurchaseDetail[]>(`${this.url}/allByPurchase/${id}`, { headers: this.headers });
  }
}
