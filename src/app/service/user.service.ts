import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { myUrl } from '../constants/constants';
import { UserLogin } from '../domain/user-login';
import { UserRegister } from '../domain/user-register';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = `${myUrl}/user`

  constructor( private http : HttpClient) {
   }

   register(user: UserRegister){
    return this.http.post(`${this.url}/register`, user);
   }

   authorize(userLogin: UserLogin){
    return this.http.post(`${this.url}/auth`, userLogin);
   }

   validateRole(token: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.get(`${this.url}/profile`, { headers: headers });
   }

}
