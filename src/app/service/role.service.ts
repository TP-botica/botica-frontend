import { Injectable } from '@angular/core';
import { myUrl } from '../constants/constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  url = `${myUrl}/role`
  constructor(private http : HttpClient) { }

  //all
  getRoles(){
    return this.http.get(`${this.url}/getList`);
  }
}
