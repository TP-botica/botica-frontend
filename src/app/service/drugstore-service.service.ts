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
    .append('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }

  //customer
  getDetailsById(drugstoreId: any, serviceId: any){
    return this.http.get<DrugstoreServiceView>(`${this.url}/searchById/${drugstoreId}/${serviceId}`, { headers: this.headers })
  }

  //drugstore
  addDrugstoreService(drugstoreService: DrugstoreService){
    return this.http.post(`${this.url}/register`, drugstoreService, { headers: this.headers } );
   }

   //drugstore
   updateDrugstoreService(drugstoreId: any, serviceId:string, drugstoreService: DrugstoreService){
    return this.http.put(`${this.url}/edit/${drugstoreId}/${serviceId}`, drugstoreService, { headers: this.headers } );
   }

   //drugstore
   deleteDrugstoreService(drugstoreId: any, serviceId:any){
    return this.http.delete(`${this.url}/deleteById/${drugstoreId}/${serviceId}`, { headers: this.headers })
   }

   //customer
   getDrugstoreLocations(serviceId: any){
    return this.http.get<DrugstoreLocation[]>(`${this.url}/locations/${serviceId}`, { headers: this.headers })
   }
  
}
