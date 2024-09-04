import { Injectable } from '@angular/core';
import { myUrl } from '../constants/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DrugstoreService, DrugstoreServiceView } from '../domain/drugstore-service';
import { DrugstoreLocation, DrugstoreProductView } from '../domain/drugstore-product';

@Injectable({
  providedIn: 'root'
})
export class DrugstoreServiceService {
  url = `${myUrl}/drugstoreService`
  headers = new HttpHeaders()
  
  constructor(private http : HttpClient) { 
    this.headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
  }

  //customer
  getDetailsById(drugstoreId: any, serviceId: any){
    const token = localStorage.getItem('token');
    const headers = this.headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<DrugstoreServiceView>(`${this.url}/searchById/${drugstoreId}/${serviceId}`, { headers: headers })
  }

  //drugstore
  addDrugstoreService(drugstoreService: DrugstoreService){
    const token = localStorage.getItem('token');
    const headers = this.headers.set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.url}/register`, drugstoreService, { headers: headers } );
   }

   //drugstore
   updateDrugstoreService(drugstoreId: any, serviceId:string, drugstoreService: DrugstoreService){
    const token = localStorage.getItem('token');
    const headers = this.headers.set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.url}/edit/${drugstoreId}/${serviceId}`, drugstoreService, { headers: headers } );
   }

   //drugstore
   deleteDrugstoreService(drugstoreId: any, serviceId:any){
    const token = localStorage.getItem('token');
    const headers = this.headers.set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.url}/deleteById/${drugstoreId}/${serviceId}`, { headers: headers })
   }

   //customer
   getDrugstoreLocations(serviceId: any){
    const token = localStorage.getItem('token');
    const headers = this.headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<DrugstoreLocation[]>(`${this.url}/locations/${serviceId}`, { headers: headers })
   }
  
}
