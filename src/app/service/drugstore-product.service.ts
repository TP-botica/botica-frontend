import { Injectable } from '@angular/core';
import { myUrl } from '../constants/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DrugstoreLocation, DrugstoreProduct, DrugstoreProductView } from '../domain/drugstore-product';

@Injectable({
  providedIn: 'root'
})
export class DrugstoreProductService {
  url = `${myUrl}/drugstoreProduct`
  headers = new HttpHeaders()
  
  constructor(private http : HttpClient) { 
    this.headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
  }

  //customer
  getDetailsById(drugstoreId: any, productId: any){
    const token = localStorage.getItem('token');
    const headers = this.headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<DrugstoreProductView>(`${this.url}/searchById/${drugstoreId}/${productId}`, { headers: headers })
  }

  //drugstore
  addDrugstoreProduct(drugstoreProduct: DrugstoreProduct){
    const token = localStorage.getItem('token');
    const headers = this.headers.set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.url}/register`, drugstoreProduct, { headers: headers } );
   }

  //drugstore
   updateDrugstoreProduct(drugstoreId: any, productId:string, drugstoreProduct: DrugstoreProduct){
    const token = localStorage.getItem('token');
    const headers = this.headers.set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.url}/edit/${drugstoreId}/${productId}`, drugstoreProduct, { headers: headers } );
   }

  //drugstore
   deleteDrugstoreProduct(drugstoreId: any, productId:any){
    const token = localStorage.getItem('token');
    const headers = this.headers.set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.url}/deleteById/${drugstoreId}/${productId}`, { headers: headers })
   }

   //customer
   getDrugstoreLocations(productId: any){
    const token = localStorage.getItem('token');
    const headers = this.headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<DrugstoreLocation[]>(`${this.url}/locations/${productId}`, { headers: headers })
   }
  
}
