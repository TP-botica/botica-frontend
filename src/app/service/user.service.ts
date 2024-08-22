import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { myUrl } from '../constants/constants';
import { UserLogin } from '../domain/user-login';
import { UserRegister } from '../domain/user-register';
import { UserEdit } from '../domain/user-edit';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = `${myUrl}/user`

  headers = new HttpHeaders()


  constructor( private http : HttpClient) {
    this.headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
  }

   //all
   register(user: UserRegister){
    return this.http.post(`${this.url}/register`, user);
   }

   //all
   authorize(userLogin: UserLogin){
    return this.http.post(`${this.url}/auth`, userLogin);
   }

   //all
   validateRole(){
    const token = localStorage.getItem('token');
    const headers = this.headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.url}/profile`, { headers: headers });
   }

   updateUser(id: any, user: UserEdit){
    const token = localStorage.getItem('token');
    const headers = this.headers.set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.url}/edit/${id}`, user, { headers: headers } );
   }

}
