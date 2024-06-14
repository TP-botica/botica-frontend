import { Injectable } from '@angular/core';
import { myUrl } from '../constants/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DrugstoreService } from '../domain/drugstore-service';

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

  addDrugstoreService(drugstoreService: DrugstoreService){
    return this.http.post(`${this.url}/register`, drugstoreService, { headers: this.headers } );
   }

   updateDrugstoreService(drugstoreId: any, serviceId:string, drugstoreService: DrugstoreService){
    return this.http.put(`${this.url}/edit/${drugstoreId}/${serviceId}`, drugstoreService, { headers: this.headers } );
   }

   deleteDrugstoreService(drugstoreId: any, serviceId:any){
    return this.http.delete(`${this.url}/deleteById/${drugstoreId}/${serviceId}`, { headers: this.headers })
   }
  
}
