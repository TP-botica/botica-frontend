import { Injectable } from '@angular/core';
import { myUrl } from '../constants/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DrugstoreProduct } from '../domain/drugstore-product';

@Injectable({
  providedIn: 'root'
})
export class DrugstoreProductService {
  url = `${myUrl}/drugstoreProduct`
  headers = new HttpHeaders()
  
  constructor(private http : HttpClient) { 
    this.headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    .append('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }

  addDrugstoreProduct(drugstoreProduct: DrugstoreProduct){
    return this.http.post(`${this.url}/register`, drugstoreProduct, { headers: this.headers } );
   }

   updateDrugstoreProduct(drugstoreId: any, productId:string, drugstoreProduct: DrugstoreProduct){
    return this.http.put(`${this.url}/edit/${drugstoreId}/${productId}`, drugstoreProduct, { headers: this.headers } );
   }

   deleteDrugstoreProduct(drugstoreId: any, productId:any){
    return this.http.delete(`${this.url}/deleteById/${drugstoreId}/${productId}`, { headers: this.headers })
   }
  
}
